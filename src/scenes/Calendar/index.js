import React from 'react';

const Calendar = () => {
    //Get Google API
    let gapi = window.gapi;

    async function getCalendar() {
        const events = await gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
        });

        console.log(events);
        console.log(events.result.items);

        const list = await gapi.client.calendar.calendarList.list({
            maxResults: 10,
        });

        console.log(list);
        console.log(list.result.items);
    }

    async function insertEvent() {
        const insert = await gapi.client.calendar.events.insert({
            calendarId: 'primary',
            start: {
                dateTime: hoursFromNow(2),
                timeZone: 'America/Chicago',
            },
            end: {
                dateTime: hoursFromNow(3),
                timeZone: 'America/Chicago',
            },
            summary: 'Have Fun!!',
            description: 'Enjoy a nice little break :)',
        });

        await getCalendar();
    }

    function hoursFromNow(n) {
        return new Date(Date.now() + n * 1000 * 60 * 60).toISOString();
    }

    return (
        <div>
            <h1>Calendar</h1>
            <button
                onClick={() => {
                    getCalendar();
                }}
            >
                Get Calendar
            </button>
            <button
                onClick={() => {
                    insertEvent();
                }}
            >
                Insert Event
            </button>
        </div>
    );
};

export default Calendar;
