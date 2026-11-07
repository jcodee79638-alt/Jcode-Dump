
class Fcr {
  resource;
  context;
  temporality;
  startTimes;
  startTimeNanos;
  previousExportTimeNanos;
  previousCounterState;
  previousHistogramState;
  previousFrequencyState;
  previousSummaryState;
  constructor(e, t, r = "cumulative") {
    ((this.resource = e),
      (this.context = t),
      (this.temporality = r),
      (this.startTimes = new Map()),
      (this.startTimeNanos = kGn()),
      (this.previousExportTimeNanos = this.startTimeNanos),
      (this.previousCounterState = new Map()),
      (this.previousHistogramState = new Map()),
      (this.previousFrequencyState = new Map()),
      (this.previousSummaryState = new Map()));
  }
  startTimeFor(e, t) {
    if (this.startTimes.has(e)) return this.startTimes.get(e);
    return (this.startTimes.set(e, t), t);
  }
  collect(e) {
    let t = wsn(this.context),
      r = kGn(),
      s = [],
      a = new Map(),
      H = (_) => {
        (s.push(_), a.set(_.descriptor.name, _));
      },
      u = this.temporality === "delta",
      f = u ? Ume.DELTA : Ume.CUMULATIVE,
      d = u ? this.previousExportTimeNanos : this.startTimeNanos;
    for (let _ = 0, L = t.length; _ < L; _++) {
      let I = t[_],
        D = I.attributes ? E2e(Object.entries(I.attributes), {}, (T, [C, O]) => ((T[C] = String(O)), T)) : {},
        S = Fjo(I.id, I.attributes);
      switch (I.type) {
        case "Counter": {
          let T = I.state.count,
            C = T;
          if (u) {
            let q = this.previousCounterState.get(S);
            if (q !== void 0)
              if (typeof T === "bigint" && typeof q === "bigint") {
                if (((C = T - q), C < BigInt(0))) C = T;
              } else {
                let Z = Number(T),
                  se = Number(q);
                if (((C = Z - se), C < 0)) C = Z;
              }
            this.previousCounterState.set(S, T);
          }
          let O = mSe(I, D),
            V = { startTime: this.startTimeFor(O.name, d), endTime: r, attributes: D, value: Number(C) };
          if (a.has(I.id)) a.get(I.id).dataPoints.push(V);
          else
            H({
              dataPointType: UV.SUM,
              descriptor: O,
              isMonotonic: I.state.incremental,
              aggregationTemporality: f,
              dataPoints: [V],
            });
          break;
        }
        case "Gauge": {
          let T = mSe(I, D),
            O = {
              startTime: this.startTimeFor(T.name, this.startTimeNanos),
              endTime: r,
              attributes: D,
              value: Number(I.state.value),
            };
          if (a.has(I.id)) a.get(I.id).dataPoints.push(O);
          else
            H({
              dataPointType: UV.GAUGE,
              descriptor: T,
              aggregationTemporality: Ume.CUMULATIVE,
              dataPoints: [O],
            });
          break;
        }
        case "Histogram": {
          let T = I.state.buckets.length,
            C = { boundaries: OKt(T - 1), counts: OKt(T) },
            O = 0,
            B = 0;
          for (let [Be, Te] of I.state.buckets) {
            if (O < T - 1) C.boundaries[O] = Be;
            ((C.counts[O] = Te - B), (B = Te), O++);
          }
          let V = I.state.count,
            q = I.state.sum,
            Z = C.counts,
            se = I.state.min,
            ae = I.state.max;
          if (u) {
            let Be = this.previousHistogramState.get(S);
            if (Be !== void 0)
              ((V = I.state.count - Be.count),
                (q = I.state.sum - Be.sum),
                (Z = C.counts.map((Te, Lt) => Math.max(0, Te - (Be.bucketCounts[Lt] ?? 0)))));
            this.previousHistogramState.set(S, {
              count: I.state.count,
              sum: I.state.sum,
              bucketCounts: C.counts.slice(),
              min: I.state.min,
              max: I.state.max,
            });
          }
          let z = mSe(I, D),
            le = {
              startTime: this.startTimeFor(z.name, d),
              endTime: r,
              attributes: D,
              value: { buckets: { boundaries: C.boundaries, counts: Z }, count: V, min: se, max: ae, sum: q },
            };
          if (a.has(I.id)) a.get(I.id).dataPoints.push(le);
          else H({ dataPointType: UV.HISTOGRAM, descriptor: z, aggregationTemporality: f, dataPoints: [le] });
          break;
        }
        case "Frequency": {
          let T = [],
            C = new Map();
          for (let [O, B] of I.state.occurrences) {
            C.set(O, B);
            let V = B;
            if (u) {
              let se = this.previousFrequencyState.get(S);
              if (se !== void 0) {
                let ae = se.get(O) ?? 0;
                V = Math.max(0, B - ae);
              }
            }
            let q = mSe(I, D),
              Z = this.startTimeFor(q.name, d);
            T.push({ startTime: Z, endTime: r, attributes: { ...D, key: O }, value: V });
          }
          if (u) this.previousFrequencyState.set(S, C);
          if (a.has(I.id)) a.get(I.id).dataPoints.push(...T);
          else {
            let O = mSe(I, D);
            H({
              dataPointType: UV.SUM,
              descriptor: O,
              aggregationTemporality: f,
              isMonotonic: !0,
              dataPoints: T,
            });
          }
          break;
        }
        case "Summary": {
          let T = [{ startTime: d, endTime: r, attributes: { ...D, quantile: "min" }, value: I.state.min }];
          for (let [q, Z] of I.state.quantiles)
            T.push({ startTime: d, endTime: r, attributes: { ...D, quantile: q.toString() }, value: Z ?? 0 });
          T.push({ startTime: d, endTime: r, attributes: { ...D, quantile: "max" }, value: I.state.max });
          let C = I.state.count,
            O = I.state.sum;
          if (u) {
            let q = this.previousSummaryState.get(S);
            if (q !== void 0) ((C = I.state.count - q.count), (O = I.state.sum - q.sum));
            this.previousSummaryState.set(S, { count: I.state.count, sum: I.state.sum });
          }
          let B = { startTime: d, endTime: r, attributes: D, value: C },
            V = { startTime: d, endTime: r, attributes: D, value: O };
          if (a.has(`${I.id}_quantiles`))
            (a.get(`${I.id}_quantiles`).dataPoints.push(...T),
              a.get(`${I.id}_count`).dataPoints.push(B),
              a.get(`${I.id}_sum`).dataPoints.push(V));
          else {
            let q = mSe(I, D);
            (H({
              dataPointType: UV.SUM,
              descriptor: { ...q, name: `${q.name}_quantiles` },
              aggregationTemporality: f,
              isMonotonic: !1,
              dataPoints: T,
            }),
              H({
                dataPointType: UV.SUM,
                descriptor: {
                  name: `${I.id}_count`,
                  description: I.description ?? "",
                  unit: "1",
                  type: Q2.COUNTER,
                  valueType: Moe.ValueType.INT,
                  advice: {},
                },
                aggregationTemporality: f,
                isMonotonic: !0,
                dataPoints: [B],
              }),
              H({
                dataPointType: UV.SUM,
                descriptor: {
                  name: `${I.id}_sum`,
                  description: I.description ?? "",
                  unit: "1",
                  type: Q2.COUNTER,
                  valueType: Moe.ValueType.DOUBLE,
                  advice: {},
                },
                aggregationTemporality: f,
                isMonotonic: !0,
                dataPoints: [V],
              }));
          }
          break;
        }
      }
    }
    if (u) this.previousExportTimeNanos = r;
    return Promise.resolve({
      resourceMetrics: { resource: this.resource, scopeMetrics: [{ scope: { name: Njo }, metrics: s }] },
      errors: [],
    });
  }
}