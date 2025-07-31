"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

const ConfirmEmailPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the fragment string after #
    const hash = window.location.hash;
    if (!hash) {
      setError("No access token found");
      setLoading(false);
      return;
    }

    // Parse the hash parameters
    const params = new URLSearchParams(hash.substring(1)); // remove #
    const accessToken = params.get("access_token");

    if (!accessToken) {
      setError("Access token missing");
      setLoading(false);
      return;
    }

    // TODO: Use the accessToken to verify the user, e.g. call your backend to confirm signup

    // For example:
    // fetch("/api/confirm", { method: "POST", headers: { Authorization: `Bearer ${accessToken}` } })

    // For now, just simulate success:
    setLoading(false);
    // Redirect after confirmation if you want:
    // router.push("/dashboard");
  }, [router]);

  if (error) return <p className="text-red-500">{error}</p>;

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
                ) : (
                  <h1 className="text-2xl font-semibold text-foreground">
                    Email Confirmed!
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
