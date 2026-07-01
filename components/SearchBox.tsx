import { Input } from "@/components/ui/input";

type Props = {
value: string;
onChange: (value: string) => void;
};

export default function SearchBox({
value,
onChange,
}: Props) {
return (
<Input
placeholder="جستجو بر اساس نام یا شماره موبایل..."
value={value}
onChange={(e) => onChange(e.target.value)}
className="h-12 rounded-xl"
/>
);
}
