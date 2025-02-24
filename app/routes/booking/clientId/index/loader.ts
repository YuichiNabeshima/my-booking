import type { Route } from "./+types/route";

export async function _loader({ params }: Route.LoaderArgs) {

  return {
    courses: {
      '1': { duration: 60, label: "Normal Course", color: "bg-blue-100" },
      '2': { duration: 90, label: "Premium Course", color: "bg-purple-100" },
      '3': { duration: 120, label: "Special Course", color: "bg-amber-100" },
    },
  };
}