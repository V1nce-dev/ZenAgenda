import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/create");
    router.reload();
  };

  return (
    <div>
      <button onClick={handleClick}>Create</button>
    </div>
  );
};

export default Page;
