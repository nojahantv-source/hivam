"use client";

type Props = {
  loading: boolean;
  onClick: () => void;
};

export default function EventSubmitButton({
  loading,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "درحال ثبت..." : "ثبت فعالیت"}
    </button>
  );
}