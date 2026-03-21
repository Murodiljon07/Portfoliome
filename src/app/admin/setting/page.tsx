"use client";

import { useEffect, useState } from "react";
import { settingsService } from "@/services/settings.service";
import { Profile } from "@/interface/types/settings.type";

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // FETCH PROFILE
  const fetchProfile = async () => {
    const res = await settingsService.getProfile();
    setProfile(res);

    setForm({
      email: res.email || "",
      first_name: res.first_name || "",
      last_name: res.last_name || "",
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // UPDATE PROFILE
  const handleProfileUpdate = async () => {
    setLoading(true);
    await settingsService.updateProfile(form);
    await fetchProfile();
    setLoading(false);
  };

  // CHANGE PASSWORD
  const handleChangePassword = async () => {
    if (passwordForm.new_password !== passwordForm.confirm_new_password) {
      alert("Passwords do not match");
      return;
    }

    setPasswordLoading(true);
    await settingsService.changePassword(passwordForm);

    setPasswordForm({
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    });

    setPasswordLoading(false);
    alert("Password updated successfully");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-lg perspective ">
        <div
          className={`relative w-full min-h-[540px] transition-transform duration-700 transform-style-gpu ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT */}
          <div className="flex flex-col justify-between absolute inset-0 backface-hidden rounded-2xl p-6 bg-white border border-gray-200 shadow-xl space-y-5 overflow-hidden">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Profile</h2>

              <button
                onClick={() => setIsFlipped(true)}
                className="text-sm text-blue-500 hover:underline"
              >
                Change Password →
              </button>
            </div>

            <div className="space-y-10">
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="text"
                value={form.first_name}
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
                placeholder="First Name"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="text"
                value={form.last_name}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
                placeholder="Last Name"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="w-full px-6 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Update Profile"}
            </button>
          </div>

          {/* BACK */}
          <div className="flex flex-col justify-between absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-6 bg-white border border-gray-200 shadow-xl space-y-5 overflow-hidden">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Change Password</h2>

              <button
                onClick={() => setIsFlipped(false)}
                className="text-sm text-blue-500 hover:underline"
              >
                ← Back
              </button>
            </div>

            <div className="space-y-10">
              <input
                type="password"
                value={passwordForm.old_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    old_password: e.target.value,
                  })
                }
                placeholder="Old Password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="password"
                value={passwordForm.new_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    new_password: e.target.value,
                  })
                }
                placeholder="New Password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="password"
                value={passwordForm.confirm_new_password}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirm_new_password: e.target.value,
                  })
                }
                placeholder="Confirm Password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <button
              onClick={handleChangePassword}
              disabled={passwordLoading}
              className="w-full px-6 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 transition disabled:opacity-50"
            >
              {passwordLoading ? "Updating..." : "Change Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
