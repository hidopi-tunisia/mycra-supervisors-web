const draw = ({}, { container }) => {
  let cardColor, headingColor, axisColor, shadeColor, borderColor

  cardColor = config.colors.white
  headingColor = config.colors.headingColor
  axisColor = config.colors.axisColor
  borderColor = config.colors.borderColor
  // Total Revenue Report Chart - Bar Chart
  // --------------------------------------------------------------------

  const options = {
    series: [
      {
        name: '2022',
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
      },
      {
        name: '2021',
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
      },
      {
        name: '2020',
        data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
      }
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [5, 7, 5],
      curve: 'straight',
      dashArray: [0, 8, 5]
    },
    title: {
      text: 'Les 3 derniers années',
      align: 'left'
    },
    legend: {
      tooltipHoverFormatter: function (val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
      }
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: [
        'Jan',
        'Fev',
        'Mar',
        'Avr',
        'Mai',
        'Jui',
        'Jui',
        'Aoû',
        'Sep',
        'Oct',
        'Nov',
        'Déc'
      ]
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val
            }
          }
        },
        {
          title: {
            formatter: function (val) {
              return val
            }
          }
        }
      ]
    },
    grid: {
      borderColor: '#f1f1f1'
    }
  }

  const chart = new ApexCharts(container, options)
  chart.render()
}

export { draw }
