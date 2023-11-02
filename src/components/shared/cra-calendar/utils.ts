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
    ...working.map((d) => ({ ...d, type: DayTypes.WORKING })),
    ...weekends.map((d) => ({ ...d, type: DayTypes.WEEKEND })),
    ...remote.map((d) => ({ ...d, type: DayTypes.REMOTE })),
    ...off.map((d) => ({ ...d, type: DayTypes.OFF })),
    ...half.map((d) => ({ ...d, type: DayTypes.HALF })),
    ...holidays.map((d) => ({ ...d, type: DayTypes.HOLIDAY }))
  ]
}

export { DayTypes, populateDays }
