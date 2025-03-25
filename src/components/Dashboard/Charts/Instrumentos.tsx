import React from "react";
import ReactEcharts from 'echarts-for-react';

const InstrumentosChart: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      top: 'bottom',
      data: ['Operativos', 'No operativos']
    },
    series: [
      {
        name: 'Estado de instrumentos',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 300, name: 'Operativos', itemStyle: { color: '#10B981' } },
          { value: 20, name: 'No operativos', itemStyle: { color: '#EF4444' } }
        ]
      }
    ]
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Estado de Instrumentos</h3>
        <p className="text-sm text-gray-500">Total: 320 instrumentos registrados</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-green-700 font-medium">Operativos</span>
            <span className="text-green-700 font-bold text-xl">300</span>
          </div>
          <div className="mt-2 text-sm text-green-600">
            93.75% del total de instrumentos
          </div>
        </div>
        
        <div className="p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-red-700 font-medium">No operativos</span>
            <span className="text-red-700 font-bold text-xl">20</span>
          </div>
          <div className="mt-2 text-sm text-red-600">
            6.25% del total de instrumentos
          </div>
        </div>
      </div>

      <ReactEcharts 
        option={option} 
        style={{ height: '300px', width: '100%' }} 
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};

export default InstrumentosChart;
