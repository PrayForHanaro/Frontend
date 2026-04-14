type Props = {
  contents: string;
};

export default function WhiteCard({ contents }: Props) {
  return (
    <div className="h-20 w-full max-w-md rounded-2xl bg-white p-3 p-5 shadow-sm">
      <h3 className="text-center font-semibold text-gray-800 text-lg">
        {contents}
      </h3>
    </div>
  );
}
