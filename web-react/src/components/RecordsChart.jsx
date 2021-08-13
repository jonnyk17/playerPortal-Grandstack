import React from "react";
import { Title, SimpleSelect } from ".";
import { Bar, Line, Pie } from "react-chartjs-2";
import { ResponsiveContainer } from "recharts";
import { gql } from "@apollo/client";

export const USER_RECORD_FRAGMENT = gql`
  fragment UserRecord on User {
    Records {
      record
      event {
        event
        eventType
      }
    }
  }
`;
export const RECORDS_FRAGMENT = gql`
  fragment AllUserRecords on Record {
    record
  }
`;

export function RecordsChart({
  user,
  records,
  onAgeSportFilterChange,
  onEventFilterChange,
}) {
  const [filterState, setFilterState] = React.useState("");
  const [eventState, setEventState] = React.useState("");

  const events = user.Records.map((row) => row.event.event);

  const getUserAvg = () => {
    const {
      event: { eventType },
    } = user.Records.find((e) => e.event.event === eventState);
    const recState = user.Records.find((e) => e.event.event === eventState);

    if (eventType === "solid" || eventType === "sec") {
      return Number(recState.record);
    } else if (eventType === "min") {
      const [minute, second] = recState.record.split(":");
      return Number(minute + "." + second);
    } else if (eventType === "hour") {
      const [hour, minute, second] = recState.record.split(":");
      const temp = Number(minute) * 60;
      const temp2 = hour + "." + temp.toString() + second;
      return Number(temp2);
    }
  };

  const getGlobalAvg = () => {
    var total = 0;
    const {
      event: { eventType },
    } = user.Records.find((e) => e.event.event === eventState);
    if (eventType === "solid" || eventType === "sec") {
      for (const record of records) {
        total += Number(record.record);
      }
    } else if (eventType === "min") {
      for (const record of records) {
        const [minute, second] = record.record.split(":");
        total += Number(minute + "." + second);
      }
    } else if (eventType === "hour") {
      for (const record of records) {
        const [hour, minute, second] = record.record.split(":");
        var minToSec = Number(minute) * 60;
        total += Number(hour + "." + minToSec.toString() + second);
      }
    }

    return total / records.length;
  };

  const chartData = {
    labels: ["Your Record", "Average of Players"],
    datasets: [
      {
        label: "Average Record",
        data:
          eventState !== "" && filterState !== ""
            ? [getUserAvg(), getGlobalAvg()]
            : [0, 0],

        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  return (
    <>
      <Title>Compare</Title>
      <SimpleSelect
        name="Select age/sport"
        list={["Age", "Sport"]}
        value={filterState}
        handleChange={(e) => {
          onAgeSportFilterChange(e.target.value, eventState);
          setFilterState(e.target.value);
        }}
      />

      <SimpleSelect
        name="Select Event"
        list={events}
        value={eventState}
        handleChange={(e) => {
          onEventFilterChange(e.target.value, filterState);
          setEventState(e.target.value);
        }}
      />
      <ResponsiveContainer>
        <div className="chart">
          <Bar
            data={chartData}
            options={{
              title: {
                fontSize: 25,
              },
            }}
          />
          <Line
            data={chartData}
            options={{
              title: {
                fontSize: 25,
              },
            }}
          />
          <Pie
            data={chartData}
            options={{
              title: {
                fontSize: 25,
              },
            }}
          />
        </div>
      </ResponsiveContainer>
    </>
  );
}
