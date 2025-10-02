import AnimatedButton from "@/components/animated-button";
interface TestProps {}

export default function Test({}: TestProps) {
  return (
    <div className="h-full w-full flex justify-center align-center">
      <AnimatedButton>Hello</AnimatedButton>
    </div>
  );
}
