"use client";

import { useState } from "react";
import { updateProfile } from "@/app/account/actions";

interface AccountFormProps {
  email: string;
  initialData: {
    full_name: string;
    contact: string;
    address: string;
  };
}

export default function AccountForm({ email, initialData }: AccountFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("contact", formData.contact);
    data.append("address", formData.address);

    const result = await updateProfile(data);

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
      setIsSaving(false);
    } else {
      setMessage({ type: 'success', text: "Profile updated successfully." });
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full relative">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl relative overflow-hidden">
        {/* Subtle inner top glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">My Account</h1>
            <p className="text-white/50 font-light text-sm md:text-base">Manage your personal information and delivery details.</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 md:mt-0 px-6 py-2 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all text-sm uppercase tracking-wider font-medium"
            >
              Edit Profile
            </button>
          )}
        </div>

        {message && (
          <div className={`mb-8 p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'}`}>
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Email (Read Only) */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-white/50 font-medium ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed focus:outline-none"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-white/50 font-medium ml-1">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white transition-all focus:outline-none ${isEditing ? 'border-primary/50 focus:border-primary focus:bg-white/10' : 'border-white/10 cursor-default opacity-80'}`}
                placeholder="Enter your full name"
              />
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-white/50 font-medium ml-1">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white transition-all focus:outline-none ${isEditing ? 'border-primary/50 focus:border-primary focus:bg-white/10' : 'border-white/10 cursor-default opacity-80'}`}
                placeholder="+1 (555) 000-0000"
              />
            </div>

          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-white/50 font-medium ml-1">Delivery Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              rows={3}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white transition-all focus:outline-none resize-none ${isEditing ? 'border-primary/50 focus:border-primary focus:bg-white/10' : 'border-white/10 cursor-default opacity-80'}`}
              placeholder="Enter your full delivery address"
            />
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(initialData);
                  setMessage(null);
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors text-sm font-medium tracking-wide"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(255,23,68,0.4)] transition-all text-sm font-medium tracking-wide flex items-center justify-center disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSaving ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
