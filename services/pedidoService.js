exports.calcularValorTotal = (itensDoPedido) => {
  if (itensDoPedido && Array.isArray(itensDoPedido))
  {
    return itensDoPedido.reduce((total, item) => {
      return total + (item.quantidade_item * item.preco_item)
    }, 0);
  }

  return 0;
}