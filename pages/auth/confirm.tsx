"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { supabaseClient } from "@/lib/supabaseClient";

const ConfirmEmailPage = () => {
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      if (data.session) {
        setConfirmed(true);
        setTimeout(() => router.push("/dashboard"), 3000);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-glass-bg backdrop-blur-sm border-glass-border shadow-2xl">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-accent rounded-full flex items-center justify-center">
                <LogIn className="w-6 h-6 text-primary" />
              </div>
              <div>
                {loading ? (
                  <h1 className="text-2xl font-semibold text-foreground">
                    Confirming your email...
                  </h1>
                ) : confirmed ? (
                  <h1 className="text-2xl font-semibold text-foreground">
                    Email Confirmed!
                  </h1>
                ) : (
                  <h1 className="text-2xl font-semibold text-foreground text-red-500">
                    Something went wrong.
                  </h1>
                )}
              </div>
              <button className="relative p-[1px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full">
                <span className="block bg-white rounded-full px-6 py-2 font-semibold">
                  Dashboard
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
