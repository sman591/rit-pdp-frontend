from pyramid.view import view_config
from pyramid.response import Response
from datetime import datetime
from dateutil.parser import parse
from dbase import Dbase
import arrow
import json

#Looks in the cookies in the headers of the request for the username
#If present, returns the username, otherwise returns an empty string
def get_username(request):
    cookies = request.headers['Cookie'].split(';')
    username = 'tst0000'
    for cookie in cookies:
        if 'SignOnDefault=' in cookie:
            username = cookie[cookie.find('=')+1:]
    return username

#Converts an event object into a dict ready for jsonification
def eventToDict(event):
    eventDict = {}
    eventDict["id"] = event.event_uid
    eventDict["title"] = event.name
    eventDict["start"] = event.event_start.isoformat()
    eventDict["end"] = event.event_end.isoformat()
    eventDict["url"] = "/calendarEditEvent.html?event=" + str(event.event_uid)
    eventDict["allDay"] = False
    return eventDict

@view_config(route_name='home', renderer='templates/mytemplate.pt')
def my_view(request):
    return {'project': 'daswebsite'}

#Make a post request here to fetch events in a range.
#Requires two parameters, start and end. Both should be unix timestamps.
@view_config(route_name='get_cal_events')
def get_cal_events(request):
    dbase = Dbase()
    events = {}
    start = datetime.fromtimestamp(int(request.GET["start"]));
    end = datetime.fromtimestamp(int(request.GET["end"]));
    dbaseEvents = dbase.get_events_between(start,end)
    eventObjects = []
    for e in dbaseEvents:
        eventObjects.append(eventToDict(e))
    return Response(json.dumps(eventObjects))

#Make a post request here to get an event's details
#Requires one parameter: event_uid
@view_config(route_name='get_event')
def get_event(request):
    dbase = Dbase()
    if 'event_uid' in request.POST:
        event_uid = request.POST["event_uid"]
        if event_uid != '':
            event = dbase.get_event(event_uid)
            return Response(json.dumps(eventToDict(event)))
    response = Response()
    response.status = 500
    return response

#Add an event to the database with a post request here
#Requires the following parameters:
# - title
# - location
# - description
# - start
# - end
@view_config(route_name='add_event')
def add_event(request):
    dbase = Dbase()

    if 'title' in request.POST:
        params = request.POST
        name = params["title"]
        location = params["location"]
        description = params["description"]
        print "start:" + params["start"]
        print "end:" + params["end"]
        #kstart = parse(params["start"])
        #kend = parse(params["end"])
        start = datetime.strptime(params["start"][0:24], '%a %b %d %Y %H:%M:%S')
        end = datetime.strptime(params["end"][0:24], '%a %b %d %Y %H:%M:%S')
        dbase.new_event(name, location, description, start, end);

    return Response()

#Add a user to the database with a post request here
#Requires the following parameters:
# - real_name
# - uid
# - account_level
@view_config(route_name='add_user')
def add_user(request):
    dbase = Dbase()

    if 'real_name' in request.POST and 'uid' in request.POST and 'account_level' in request.POST:
        params = request.POST
        real_name = params["real_name"]
        uid = params["uid"]
        account_level = params["account_level"]
        if dbase.get_user_privelege(get_username()) == 2:
            dbase.add_user(real_name, uid, int(uid));

    return Response()

#Registers a user for an event
#Make a post request with a user's uid (username), and an event_uid
@view_config(route_name='register_user')
def register_user(request):
    dbase = Dbase()
    if 'event_uid' in request.POST:
        username = get_username(request)
        if username != '':
            event_uid = request.POST["event_uid"]
            dbase.register_user_for_event(username, event_uid)
            return Response()
    response = Response()
    response.status = 500
    return response

#Approves a user for an event
#Make a post request with a user's uid (username), and an event_uid
@view_config(route_name='approve_user')
def approve_user(request):
    dbase = Dbase()
    if 'event_uid' in request.POST and 'user_uid' in request.POST:
        user_uid = request.POST["user_uid"]
        event_uid = request.POST["event_uid"]
        if dbase.get_user_privelege(get_username()) == 1:
            dbase.approve_user_for_event(user_uid, event_uid)
        return Response()
    response = Response()
    response.status = 500
    return response

#Deny a user for an event
#Make a post request with a user's uid (username), and an event_uid
@view_config(route_name='deny_user')
def deny_user(request):
    dbase = Dbase()
    if 'event_uid' in request.POST and 'user_uid' in request.POST:
        user_uid = request.POST["user_uid"]
        event_uid = request.POST["event_uid"]
        if dbase.get_user_privelege(get_username()) == 1:
            dbase.deny_user_for_event(user_uid, event_uid)
        return Response()
    response = Response()
    response.status = 500
    return response

#Cancels an event
#Params: event_uid
@view_config(route_name='cancel_event')
def cancel_event(request):
    dbase = Dbase()
    if 'event_uid' in request.POST:
        event_uid = request.POST["event_uid"]
        if dbase.get_user_privelege(get_username()) == 1:
            dbase.cancel_event(event_uid)
        return Response()
    response = Response()
    response.status = 500
    return response

#Deletes an event
#params: event_uid
@view_config(route_name='delete_event')
def delete_event(request):
    dbase = Dbase()
    if 'event_uid' in request.POST:
        event_uid = request.POST["event_uid"]
        if dbase.get_user_privelege(get_username()) == 1:
            dbase.deactivate_event(event_uid)
        return Response()
    response = Response()
    response.status = 500
    return response

#Deletes a user's account
#params: user_uid
@view_config(route_name='delete_user')
def delete_user(request):
    dbase = Dbase()
    if 'user_uid' in request.POST:
        user_uid = request.POST["user_uid"]
        if dbase.get_user_privelege(get_username()) == 1:
            dbase.deactivate_user(user_uid)
        return Response()
    response = Response()
    response.status = 500
    return response

#Undeletes an event
#params: event_uid
@view_config(route_name='undelete_event')
def undelete_event(request):
    dbase = Dbase()
    if 'event_uid' in request.POST:
        event_uid = request.POST["event_uid"]
        if dbase.get_user_privelege(get_username()) == 1:
            dbase.reactivate_event(event_uid)
        return Response()
    response = Response()
    response.status = 500
    return response

#Undeletes a user's account
#params: user_uid
@view_config(route_name='undelete_user')
def undelete_user(request):
    dbase = Dbase()
    if 'user_uid' in request.POST:
        user_uid = request.POST["user_uid"]
        if dbase.get_user_privelege(get_username()) == 1:
            dbase.reactivate_user(user_uid)
        return Response()
    response = Response()
    response.status = 500
    return response

#Modifies an event
#required params: event_uid
#optional params: title, location, description, event_start, event_end, event_{registration|approval}_{start|end}
@view_config(route_name='modify_event')
def modify_event(request):
    dbase = Dbase()
    if 'event_uid' in request.POST and dbase.get_user_privelege(get_username()) == 1:
        event_uid = request.POST["event_uid"]
        if 'title' in request.POST:
            dbase.modifyEvent(event_uid, name=request.POST['title'])
        if 'location' in request.POST:
            dbase.modifyEvent(event_uid, location=request.POST['location'])
        if 'description' in request.POST:
            dbase.modifyEvent(event_uid, description=request.POST['description'])
        if 'event_start' in request.POST:
            newstart = parse(params["event_start"])
            dbase.modifyEvent(event_uid, event_start=newstart)
        if 'event_end' in request.POST:
            newend = parse(params["event_end"])
            dbase.modifyEvent(event_uid, event_end=newend)
        if 'event_registration_start' in request.POST:
            new_registration_start = parse(params["event_registration_start"])
            dbase.modifyEvent(event_uid, event_registration_start=new_registration_start)
        if 'event_registration_end' in request.POST:
            new_registration_end = parse(params["event_registration_end"])
            dbase.modifyEvent(event_uid, event_registration_end=new_registration_end)
        if 'event_approval_start' in request.POST:
            new_approval_start = parse(params["event_approval_start"])
            dbase.modifyEvent(event_uid, event_approval_start=new_approval_start)
        if 'event_approval_end' in request.POST:
            new_approval_end = parse(params["event_approval_end"])
            dbase.modifyEvent(event_uid, event_approval_end=new_approval_end)
        return Response()
    response = Response()
    response.status = 500
    return response
