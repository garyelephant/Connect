#coding:utf-8
from serviceprovider import ServiceProvider
from threading import Thread
import logging

def main():
	logFormat = '%(levelname)s[%(asctime)s@%(funcName)s#%(lineno)d]:%(message)s'
	logging.basicConfig(filename = 'log', format = logFormat, level = logging.INFO)
	logging.info('logging initialized')
	services = ServiceProvider()
	#启动xmlrpc server
	servicesThread = Thread(target = services._start)
	servicesThread.setDaemon(True)
	servicesThread.start()
	logging.info('Connect services started')


if __name__ == '__main__':
	main()