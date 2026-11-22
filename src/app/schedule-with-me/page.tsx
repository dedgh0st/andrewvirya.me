import type { Metadata } from "next";
import ScheduleWithMeContent from "./schedule-with-me-content";

export const metadata: Metadata = {
  title: "Schedule with me | andrewvirya.me",
  description:
    "Choose a time to plan a getaway, catch up, or have a date night.",
};

export default function ScheduleWithMePage() {
  return <ScheduleWithMeContent />;
}
