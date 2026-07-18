import Spinner from "@/app/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center bg-white py-32 dark:bg-navy">
      <Spinner size="lg" />
    </div>
  );
}
