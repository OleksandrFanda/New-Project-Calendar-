import { useState } from "react";
import * as dateFns from 'date-fns'; 
import styles from './Calendar.module.css'; 

const formatOfYear = 'u';
const formatOfMonth = 'LLLL';
const formatOfWeek = 'EEEE';
const formatOfDay = 'd';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState (new Date())
    const [selectData, setSelectData] = useState (new Date())
    const today = new Date();


    const firstDay = dateFns.startOfMonth(currentDate);
    const lastDay = dateFns.lastDayOfMonth(currentDate);
    const startDate = dateFns.startOfWeek(firstDay);
    const endDate = dateFns.lastDayOfWeek(lastDay);
    const totalDate = dateFns.eachDayOfInterval({start:startDate, end:endDate});
    
    const weeks = ((date)=> {
    const weeks = [];
        for(let day = 0; day <= 6; day++){
            weeks.push(date[day]);
        }
        return weeks;
    })(totalDate);

    const isToday = (day) => dateFns.isSameDay(day, today);
    const isSelectedDate = (day) => dateFns.isSameDay(day, selectData);

    return <div className={styles.backgroundP}>
            <div className={styles.leftpage}>
                <div className={styles.weekFormat}>{dateFns.format(selectData, formatOfWeek)}</div>
                <div className={styles.dayFormat}>{dateFns.format(selectData, formatOfDay)}</div>
            </div>
            <div className={styles.rightpage}>
                <div className={styles.monthPad}>{dateFns.format(currentDate, formatOfMonth)} {dateFns.format(currentDate, formatOfYear)}</div>
                <div className={styles.numberSlot}>
                    {weeks.map(week => (
                    <span className={styles.colorWeek}>{dateFns.format(week, formatOfWeek)}</span>
                    ))}
                    {totalDate.map(date => (
                        <span style={{ color: isToday(date) ? 'red' : !dateFns.isSameMonth(date, currentDate) ? '#ddd' : isSelectedDate(date) ? 'green' : ''}}
                        onClick={() => setSelectData(date)}>
                        <span className={styles.dateForm}>{dateFns.format(date, formatOfDay)}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>

}
export default Calendar;
