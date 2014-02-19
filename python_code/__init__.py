from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include('pyramid_chameleon')
    config.add_route('home', '/')
    config.add_route('get_cal_events', '/calendar/events')
    config.add_route('add_event', '/calendar/addevent')
    config.add_route('add_user', '/calendar/adduser')
    config.add_route('get_event', '/calendar/getevent')
    config.add_route('register_user', '/calendar/register')
    config.add_route('approve_user', '/calendar/approve')
    config.add_route('deny_user', '/calendar/deny')
    config.add_route('cancel_event', '/calendar/cancel_event')
    config.add_route('delete_event', '/calendar/delete_event')
    config.add_route('delete_user', '/calendar/delete_user')
    config.add_route('undelete_event', '/calendar/undelete_event')
    config.add_route('undelete_user', '/calendar/undelete_user')
    config.add_route('modify_event', '/calendar/modify_event')
    config.add_static_view('/', 'static', cache_max_age=3600)
    config.scan()
    return config.make_wsgi_app()
