import Link from "next/link";

interface TodaySchedules {
  id: number;
  time: string | Date;
  subject: string;
  lecture: string;
  media: string;
  style: string;
}

const today_schedules: TodaySchedules[] = [
  {
    id: 1,
    time: "9:00 AM",
    subject: "Mathematics",
    lecture: "Lecture",
    media: "YouTube",
    style: "border-l-blue-500",
  },
  {
    id: 2,
    time: "9:30 AM",
    subject: "Reasoning",
    lecture: "Lecture",
    media: "YouTube",
    style: "border-l-red-500",
  },
  {
    id: 3,
    time: "10:00 AM",
    subject: "English",
    lecture: "Lecture",
    media: "YouTube",
    style: "border-l-green-500",
  },
  {
    id: 4,
    time: "10:40 AM",
    subject: "Punjabi",
    lecture: "Lecture",
    media: "YouTube",
    style: "border-l-purple-500",
  },
];

const TimeTableSchedule = () => {
  return (
    <section className="w-full rounded-2xl  bg-white p-5 ">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Today's Schedule
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your classes for today
          </p>
        </div>

        <Link
          href="/timetable"
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
        >
          View all
        </Link>
      </div>

      {/* Schedule List */}
      <div className="space-y-3 h-80 overflow-y-scroll ">
        {today_schedules.map((item) => (
          <article
            key={item.id}
            className={`rounded-xl border border-slate-100 border-l-4 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md  ${item.style}`}
          >
            {/* Time + Subject */}
            <div className="flex items-center gap-4">
              <div className="min-w-[75px]">
                <p className="text-sm font-semibold text-blue-600">
                  {item.time instanceof Date
                    ? item.time.toLocaleTimeString()
                    : item.time}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800">
                  {item.subject}
                </h3>

                {/* Lecture + Media */}
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                  <span>{item.lecture}</span>

                  <span className="h-1 w-1 rounded-full bg-slate-400" />

                  <span>{item.media}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TimeTableSchedule;