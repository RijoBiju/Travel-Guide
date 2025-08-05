import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabaseClient } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Trips() {
  const [userDetails, setUserDetails] = useState<
    { id: string; trip_title: string }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    const fetchTrips = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabaseClient.auth.getUser();

      if (userError || !user) {
        console.error("User not found", userError);
        return;
      }

      const { data, error } = await supabaseClient
        .from("trips")
        .select("id, trip_title")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching dayplans:", error);
      } else {
        setUserDetails(data);
        console.log(data);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div>
        <Navbar saveButton={false} />
      </div>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Your Trips</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userDetails ? (
            userDetails.map((trip) => (
              <div key={trip.id} className="bg-white p-6 rounded-lg shadow">
                <h2
                  onClick={() =>
                    router.push(
                      `/dashboard?tripId=${trip.id}&tripTitle=${trip.trip_title}`
                    )
                  }
                  className="text-xl font-semibold mb-2 cursor-pointer"
                >
                  {trip.trip_title}
                </h2>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No trips found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
