function Paginacion({ page, setPage }) {
  return (
    <div className="d-flex gap-3 my-3">
      <button
        className="btn btn-secondary"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
      >
        Anterior
      </button>

      <button
        className="btn btn-primary"
        onClick={() => setPage((p) => p + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Paginacion;
