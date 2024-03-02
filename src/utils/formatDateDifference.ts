function formatDateDifference(startDate: string, endDate: string): string {
    const startDateTime: Date = new Date();
    const endDateTime: Date = new Date(endDate);
  
    const timeDifference: number =
      endDateTime.getTime() - startDateTime.getTime();
  
    const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes: number = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds: number = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    return `${days}d/ ${hours}h/ ${minutes}min/ ${seconds}s`;
  }
  
  function formatDateDifferenceArray(
    startDate: string,
    endDate: string
  ): number[] {
    const startDateTime: Date = new Date();
    const endDateTime: Date = new Date(endDate);
  
    const timeDifference: number =
      endDateTime.getTime() - startDateTime.getTime();
  
    const days: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes: number = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds: number = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
    return [days, hours, minutes, seconds];
  }
  
  export { formatDateDifference, formatDateDifferenceArray };