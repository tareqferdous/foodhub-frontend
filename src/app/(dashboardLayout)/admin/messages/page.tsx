"use client";

import { Mail, MessageSquare, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/contact-messages", {
          credentials: "include",
          cache: "no-store",
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || !result?.success) {
          setError(result?.message || "Failed to load contact messages.");
          return;
        }

        setMessages(result.data || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load contact messages.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return messages;

    return messages.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q),
    );
  }, [messages, search]);

  const formatDateTime = (value: string) => {
    return new Date(value).toLocaleString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-[#e10101] border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-rose-50'>
      <div className='relative z-10 max-w-7xl mx-auto px-6 py-12'>
        <div className='mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4'>
          <div>
            <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-[#e10101] to-red-900 bg-clip-text text-transparent mb-2'>
              Contact Messages
            </h1>
            <p className='text-gray-600'>
              Total {filteredMessages.length} messages
            </p>
          </div>

          <div className='w-full lg:w-96 relative'>
            <Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500' />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search by name, email, subject...'
              className='w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100'
            />
          </div>
        </div>

        {error ? (
          <div className='rounded-2xl bg-red-50 border border-red-200 p-6 text-red-700'>
            {error}
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className='bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100'>
            <MessageSquare className='w-12 h-12 mx-auto text-gray-400 mb-3' />
            <h3 className='text-xl font-bold text-gray-900 mb-2'>
              No Messages Found
            </h3>
            <p className='text-gray-600'>
              New messages from contact form will appear here.
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredMessages.map((item) => (
              <article
                key={item.id}
                className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3'>
                  <div>
                    <h3 className='text-lg font-bold text-gray-900'>
                      {item.subject}
                    </h3>
                    <p className='text-xs text-gray-500 mt-1'>
                      {formatDateTime(item.createdAt)}
                    </p>
                  </div>
                  <div className='inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-medium text-amber-700'>
                    <Mail className='w-3.5 h-3.5' />
                    New Contact Request
                  </div>
                </div>

                <div className='mt-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.name}</p>
                  <p className='text-gray-600'>{item.email}</p>
                </div>

                <p className='mt-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap'>
                  {item.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
