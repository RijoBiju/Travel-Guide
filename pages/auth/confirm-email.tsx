import { LogIn } from "lucide-react";

export default function ConfirmEmail() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-glass-bg backdrop-blur-sm border-glass-border shadow-2xl">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-accent rounded-full flex items-center justify-center">
                <LogIn className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  A confirmation link has been sent to your mail
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
