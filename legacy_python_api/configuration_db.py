import os
import tornado.options
from configobj import ConfigObj

ROOT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), )
CONFIG_PATH = os.path.join(ROOT_PATH,  'master_db.cfg')
config = ConfigObj(CONFIG_PATH)

ZWAVE_GATEWAY_IP = config.get('ZWAVE_GATEWAY_IP', '')
MASTER_PORT = int(config.get('MASTER_PORT', 80))

LOCATION_ROOT = config.get('LOCATION_ROOT', 'WuKong')

DEPLOY_PLATFORMS = []
DEPLOY_PLATFORMS.append(config.get('DEPLOY_PLATFORM', 'avr_mega2560'))

SIMULATION = config.get('SIMULATION', 'false')
MONITORING = config.get('MONITORING', 'false')
MONITORING_NODE = [3, 4,5,6] #[2, 3,4,5,6]
MONITORING_PORT = [2, 2,2,2]
MONITORING_COUNT = 4
MONITORING_BUFSIZE=51


#XML_PATH = os.path.join(ROOT_PATH, 'wukong', 'Applications')
COMPONENTXML_PATH = os.path.join(ROOT_PATH, 'wukong', 'ComponentDefinitions', 'WuKongStandardLibrary.xml')
TEMPLATE_DIR = os.path.join(ROOT_PATH, 'wukong', 'tools', 'xml2java')
JAVA_OUTPUT_DIR = os.path.join(ROOT_PATH, 'src', 'app', 'wkdeploy', 'java')
TESTRTT_PATH = os.path.join(ROOT_PATH, 'wukong', 'tools', 'python', 'pyzwave')
if hasattr(tornado.options.options, 'appdir') and tornado.options.options.appdir != None:
	APP_DIR = tornado.options.options.appdir
else:
	APP_DIR = os.path.join(ROOT_PATH, 'wukong', 'apps')
BASE_DIR = os.path.join(ROOT_PATH, 'wukong', 'master', 'baseapp')
MOCK_XML = os.path.join(ROOT_PATH, 'wukong', 'master', 'mock_discovery.xml')

NETWORKSERVER_ADDRESS = config.get('NETWORKSERVER_ADDRESS', '127.0.0.1')
NETWORKSERVER_PORT = int(config.get('NETWORKSERVER_PORT', 10008))

WKPFCOMM_AGENT = config.get('WKPFCOMM_AGENT', 'ZWAVE')

MONGODB_URL = config.get('MONGODB_URL', '')
