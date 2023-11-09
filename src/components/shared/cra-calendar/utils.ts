const DayTypes = {
  WORKING: 'working',
  HALF: 'half',
  REMOTE: 'remote',
  OFF: 'off',
  WEEKEND: 'weekend',
  HOLIDAY: 'holiday'
}

const populateDays = ({ working, weekends, remote, off, half, holidays }) => {
  return [
    ...working.map((d) => ({
      ...d,
      dates: d.date,
      type: DayTypes.WORKING,
      highlight: {
        color: '#2196f3',
        fillMode: 'solid'
      },
    })),
    ...weekends.map((d) => ({
      ...d,
      dates: d.date,
      type: DayTypes.WEEKEND,
      highlight: {
        color: 'green',
        fillMode: 'outline'
      },
      popover: { label: "Week-end" }
    })),
    ...remote.map((d) => ({
      ...d,
      dates: d.date,
      type: DayTypes.REMOTE,
      highlight: {
        color: 'purple',
        fillMode: 'solid'
      },
    })),
    ...off.map((d) => ({
      ...d,
      dates: d.date,
      type: DayTypes.OFF,
      highlight: {
        color: 'red',
        fillMode: 'outline'
      },
      popover: { label: d.meta.value }
    })),
    ...half.map((d) => ({
      ...d,
      dates: d.date,
      type: DayTypes.HALF,
      highlight: {
        color: '#2196f3',
        fillMode: 'outline'
      },
    })),
    ...holidays.map((d) => ({
      ...d,
      dates: d.date,
      type: DayTypes.HOLIDAY,
      highlight: {
        color: 'green',
        fillMode: 'solid'
      },
      popover: { label: d.meta.value }
    }))
  ]
}

export { DayTypes, populateDays }
