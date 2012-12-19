#coding:utf-8
import logging
def main():
	logFormat = '%(levelname)s[%(asctime)s@%(funcName)s#%(lineno)d]:%(message)s'
	logging.basicConfig(filename = 'log', format = logFormat, level = logging.INFO)
	logging.info('Connect started')


if __name__ == '__main__':
	main()