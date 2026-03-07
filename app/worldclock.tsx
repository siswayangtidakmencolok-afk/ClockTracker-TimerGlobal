function WorldClock({ zone }: { zone: string }) {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {time.tz(zone).format("HH:mm:ss")}
    </div>
  );
}