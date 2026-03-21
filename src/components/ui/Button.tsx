const styles = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "bg-gray-100 text-black hover:bg-gray-200",
  outline: "border text-black hover:bg-gray-50",
};

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
  handelStye?: string;
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  handelStye,
}: ButtonProps) {
  let base = ` cursor-pointer ${handelStye || "w-full"}  py-2 rounded-xl text-sm font-medium transition flex items-center justify-center`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={` ${base} ${styles[variant]} ${
        loading ? "opacity-60 cursor-not-allowed" : ""
      } `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
