export function generateTransactions(data) {
  const results = [];

  data.forEach((r) => {
    results.push({
      id: `TX${r.id}`,
      user: r.user,
      date: r.date,
      amount: r.totalPrice || 0,
      status: r.status,
    });
  });

  return results;
}
