#coding:utf-8
import logging
from SimpleXMLRPCServer import SimpleXMLRPCServer

class ServiceRoot:
    """
    定义此类以实现在服务端的调用中结合命名空间
    """
    def __init__(self):
        pass


class ServiceProvider(object):
	"""docstring for ServiceProvider"""
	def __init__(self):
		super(ServiceProvider, self).__init__()

	def _start(self):
		"""
        内部使用，以启动XML_RPC服务器
        """
		server = SimpleXMLRPCServer(('localhost', 2012), logRequests = True)
		serviceRoot = ServiceRoot()
		serviceRoot.system = self
		server.register_instance(serviceRoot, allow_dotted_names = True)
		server.serve_forever() 

	def sync(self, path):
		logging.info('synchronize path:%s', path)

	def testServer(self):
		logging.debug('only for test')
