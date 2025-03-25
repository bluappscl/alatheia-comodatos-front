import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import ReactEcharts from 'echarts-for-react';

const VigentesChart = () => {
  // Datos de ejemplo para las gráficas
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const vigentesData = [120, 130, 125, 135, 150, 160, 130, 125, 135, 145, 135, 165];
  const vencidosData = [15, 20, 20, 25, 30, 35, 35, 40, 40, 40, 45, 50];

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Comodatos Vigentes', 'Comodatos Vencidos'],
      top: 'top'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: {
        lineStyle: {
          color: '#6B7280'
        }
      },
      axisLabel: {
        color: '#6B7280',
        fontSize: 10,
        formatter: (value: any) => value.substring(0, 3)
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#E5E7EB'
        }
      },
      axisLabel: {
        color: '#6B7280',
        fontSize: 10
      }
    },
    series: [
      {
        name: 'Comodatos Vigentes',
        type: 'bar',
        data: vigentesData,
        itemStyle: {
          color: 'rgba(59, 130, 246, 0.7)', // Blue color
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1
        },
        emphasis: {
          focus: 'series'
        },
        barMaxWidth: '60%'
      },
      {
        name: 'Comodatos Vencidos',
        type: 'bar',
        data: vencidosData,
        itemStyle: {
          color: 'rgba(236, 72, 153, 0.7)', // Pink color
          borderColor: 'rgba(236, 72, 153, 1)',
          borderWidth: 1
        },
        emphasis: {
          focus: 'series'
        },
        barMaxWidth: '60%'
      }
    ]
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-xl font-medium text-gray-700 my-4">
          Comodatos Totales:{" "}
          <span className="text-gray-900">170 Vigentes</span> /{" "}
          <span className="text-gray-900">50 Vencidos</span>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          Nuevos este mes:{" "}
          <span className="text-green-600 font-semibold flex items-center inline-flex">
            2 <ArrowUpOutlined className="ml-1 h-3 w-3" />
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-2 mb-4">
          Por vencer próximo mes:{" "}
          <span className="text-red-600 font-semibold flex items-center inline-flex">
            3 <ArrowDownOutlined className="ml-1 h-3 w-3" />
          </span>
        </p>
      </div>

      {/* Chart */}
      <ReactEcharts 
        option={option} 
        style={{ height: '300px', width: '100%' }} 
        opts={{ renderer: 'canvas' }}
      />
      
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm bg-blue-400"></div>
          <span className="text-sm text-gray-500">Comodatos Vigentes</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm bg-pink-400"></div>
          <span className="text-sm text-gray-500">Comodatos Vencidos</span>
        </div>
      </div>
    </div>
  );
};

export default VigentesChart;
