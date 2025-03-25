import { 

  InfoCircleOutlined, 
  MoreOutlined, 
  ArrowUpOutlined, 
  ArrowDownOutlined 
} from "@ant-design/icons";
import { Card, Tabs, Button, Badge, Progress, Dropdown, Menu } from "antd";
import InstrumentosChart from "./Charts/Instrumentos";
import PagosBarChart from "./Charts/PagosBarChart";
import VigentesChart from "./Charts/Vigente";

const { TabPane } = Tabs;

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b bg-white">
        {/* <div className="flex h-16 items-center px-6">
  
          <div className="ml-auto flex items-center gap-4">
            <Button icon={<CalendarOutlined />} className="flex items-center gap-1.5">
              Marzo 2025
            </Button>
            <Button icon={<DownloadOutlined />} className="flex items-center gap-1.5">
              Exportar
            </Button>
            <Button type="primary" icon={<SearchOutlined />} className="flex items-center gap-1.5">
              Buscar
            </Button>
          </div>
        </div> */}
        <div className="border-t border-gray-200 bg-white/95 px-6 py-2">
          <p className="text-sm text-gray-500">
            Aquí puedes ver el reporte histórico y mensual de tus comodatos y pagos
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 pt-4">
        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-sm">
              <div className="flex flex-row items-center justify-between pb-2">
                <span className="text-sm font-medium">Comodatos Totales</span>
                <InfoCircleOutlined className="h-4 w-4 text-gray-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">220</div>
                <div className="flex items-center gap-1 pt-1">
                  <Badge 
                    className="bg-green-100 text-green-600 px-2 py-1 rounded flex items-center" 
                    count={<><ArrowUpOutlined className="mr-1 h-3 w-3" />170</>}
                  />
                  <span className="text-xs text-gray-500">Vigentes</span>
                  <Badge 
                    className="ml-2 border border-red-200 text-red-600 px-2 py-1 rounded flex items-center" 
                    count={<><ArrowDownOutlined className="mr-1 h-3 w-3" />50</>}
                  />
                  <span className="text-xs text-gray-500">Vencidos</span>
                </div>
              </div>
            </Card>

            <Card className="shadow-sm">
              <div className="flex flex-row items-center justify-between pb-2">
                <span className="text-sm font-medium">Nuevos este mes</span>
                <InfoCircleOutlined className="h-4 w-4 text-gray-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="flex items-center gap-1 pt-1">
                  <Badge 
                    className="border border-amber-200 text-amber-600 px-2 py-1 rounded flex items-center"
                    count={<><ArrowDownOutlined className="mr-1 h-3 w-3" />3</>}
                  />
                  <span className="text-xs text-gray-500">Por vencer próximo mes</span>
                </div>
              </div>
            </Card>

            <Card className="shadow-sm">
              <div className="flex flex-row items-center justify-between pb-2">
                <span className="text-sm font-medium">Instrumentos</span>
                <InfoCircleOutlined className="h-4 w-4 text-gray-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">320</div>
                <div className="flex items-center gap-1 pt-1">
                  <Badge 
                    className="bg-green-100 text-green-600 px-2 py-1 rounded"
                    count="300"
                  />
                  <span className="text-xs text-gray-500">Operativos</span>
                  <Badge 
                    className="ml-2 border border-red-200 text-red-600 px-2 py-1 rounded"
                    count="20"
                  />
                  <span className="text-xs text-gray-500">No operativos</span>
                </div>
              </div>
            </Card>

            <Card className="shadow-sm">
              <div className="flex flex-row items-center justify-between pb-2">
                <span className="text-sm font-medium">Pagos atrasados</span>
                <Dropdown 
                  overlay={
                    <Menu>
                      <Menu.Item key="1">Ver detalles</Menu.Item>
                      <Menu.Item key="2">Exportar reporte</Menu.Item>
                    </Menu>
                  }
                  trigger={['click']}
                >
                  <Button type="text" icon={<MoreOutlined />} className="h-8 w-8" />
                </Dropdown>
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="flex items-center gap-1 pt-1">
                  <Badge 
                    className="border border-red-200 text-red-600 px-2 py-1 rounded flex items-center"
                    count={<><ArrowUpOutlined className="mr-1 h-3 w-3" />+1</>}
                  />
                  <span className="text-xs text-gray-500">Desde el mes pasado</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs for main content */}
          <Tabs defaultActiveKey="overview" className="bg-white rounded-lg shadow-sm p-4">
            <TabPane tab="Vista general" key="overview">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  {/* Comodatos Chart */}
                  <Card className="lg:col-span-4 shadow-sm">
                    <div className="px-4 pt-4">
                      <h3 className="text-lg font-medium">Comodatos Vigentes y Vencidos</h3>
                      <p className="text-sm text-gray-500">Distribución mensual durante el último año</p>
                    </div>
                    <div className="p-4">
                      <VigentesChart />
                    </div>
                  </Card>

                  {/* Pagos Status (from PagosBarChart) */}
                  <Card className="lg:col-span-3 shadow-sm">
                    <div className="px-4 pt-4">
                      <h3 className="text-lg font-medium">Estado de Pagos</h3>
                      <p className="text-sm text-gray-500">Este mes</p>
                    </div>
                    <div className="p-4">
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-emerald-600">Objetivo</span>
                            </div>
                            <div className="font-semibold">$250,000</div>
                          </div>
                          <Progress 
                            percent={100} 
                            showInfo={false} 
                            strokeColor="#059669" 
                            trailColor="#D1FAE5" 
                            size={['default', 8]} 
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-blue-600">Compras</span>
                            </div>
                            <div className="font-semibold">$240,000</div>
                          </div>
                          <Progress 
                            percent={96} 
                            showInfo={false} 
                            strokeColor="#2563EB" 
                            trailColor="#DBEAFE" 
                            size={['default', 8]} 
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-red-600">Faltantes</span>
                            </div>
                            <div className="font-semibold">$10,000</div>
                          </div>
                          <Progress 
                            percent={4} 
                            showInfo={false} 
                            strokeColor="#DC2626" 
                            trailColor="#FEE2E2" 
                            size={['default', 8]} 
                          />
                        </div>

                        <div className="rounded-lg border bg-gray-50 p-4">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">Progreso total</div>
                            <div className="text-sm font-medium">96%</div>
                          </div>
                          <Progress 
                            percent={96} 
                            showInfo={false} 
                            className="mt-2" 
                            size={['default', 8]} 
                          />
                          <div className="mt-2 text-xs text-gray-500">
                            Faltan $10,000 para alcanzar el objetivo mensual
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Pagos Chart */}
                <Card className="shadow-sm">
                  <div className="px-4 pt-4">
                    <h3 className="text-lg font-medium">Pagos Mensuales</h3>
                    <p className="text-sm text-gray-500">Comparativa entre objetivo y pagos realizados</p>
                  </div>
                  <div className="p-4">
                    <PagosBarChart />
                  </div>
                </Card>
              </div>
            </TabPane>



            <TabPane tab="Instrumentos" key="instrumentos">
              <Card className="shadow-sm">
                <div className="px-4 py-3">
                  <h3 className="text-lg font-medium">Detalle de Instrumentos</h3>
                </div>
                <div className="px-4 pb-4">
                  <InstrumentosChart />
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
