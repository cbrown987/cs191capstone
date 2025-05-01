export const LoadingComponent = () => {
  return (
        <div className="text-center py-16 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#902425]/20 border-t-[#902425] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading...</p>
        </div>
    );
}