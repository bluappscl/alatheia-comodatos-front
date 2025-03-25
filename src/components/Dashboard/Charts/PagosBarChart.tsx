import React from "react";
import ReactEcharts from 'echarts-for-react';
import { ArrowDownOutlined } from "@ant-design/icons";
import { Card, Progress } from "antd";

const PagosSummaryCards: React.FC = () => {
  const goalAmount = 250000;
  const paidAmount = 240000;
  const remainingAmount = 10000;
  const progressPercentage = (paidAmount / goalAmount) * 100;
  
  return (
    <Card className="shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Estado de Pagos</h3>
        <p className="text-sm text-gray-500">Este mes</p>
      </div>
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
    </Card>
  );
};

const PagosBarChart: React.FC = () => {
  // Datos de ejemplo para las gráficas
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const pagosObjetivoData = [150, 160, 140, 170, 180, 190, 200, 210, 220, 230, 240, 250];
  const pagosRealizadosData = [120, 130, 125, 140, 150, 180, 190, 200, 205, 220, 230, 240];
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Pagos Objetivo', 'Pagos Realizados'],
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
        name: 'Pagos Objetivo',
        type: 'bar',
        data: pagosObjetivoData,
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
        name: 'Pagos Realizados',
        type: 'bar',
        data: pagosRealizadosData,
        itemStyle: {
          color: 'rgba(20, 184, 166, 0.7)', // Teal color
          borderColor: 'rgba(20, 184, 166, 1)',
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
      <p className="text-sm text-gray-500 mb-4">
        Pagos atrasados:{" "}
        <span className="text-red-600 font-semibold flex items-center inline-flex">
          3 <ArrowDownOutlined className="ml-1 h-3 w-3" />
        </span>
      </p>

      <ReactEcharts 
        option={option} 
        style={{ height: '300px', width: '100%' }} 
        opts={{ renderer: 'canvas' }}
      />
      
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm bg-blue-400"></div>
          <span className="text-sm text-gray-500">Pagos Objetivo</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm bg-teal-400"></div>
          <span className="text-sm text-gray-500">Pagos Realizados</span>
        </div>
      </div>
    </div>
  );
};

export default PagosBarChart;
