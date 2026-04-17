const TrustBar = () => {
  return (
    <section className="py-6 border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-8 sm:gap-14 text-center">
          <div>
            <div className="text-lg sm:text-xl font-heading font-bold text-foreground">500+</div>
            <div className="text-muted-foreground text-[11px] mt-0.5">ayudas activas</div>
          </div>
          <div className="w-px h-7 bg-border" />
          <div>
            <div className="text-lg sm:text-xl font-heading font-bold text-foreground">Toda España</div>
            <div className="text-muted-foreground text-[11px] mt-0.5">cualquier sector</div>
          </div>
          <div className="w-px h-7 bg-border hidden sm:block" />
          <div className="hidden sm:block">
            <div className="text-lg sm:text-xl font-heading font-bold text-foreground">15%</div>
            <div className="text-muted-foreground text-[11px] mt-0.5">solo a éxito</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
