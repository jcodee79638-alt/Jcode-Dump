
var IHr = Ie(function (kkn) {
  Object.defineProperty(kkn, "__esModule", { value: !0 });
  kkn.createNoopMeter =
    kkn.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC =
    kkn.NOOP_OBSERVABLE_GAUGE_METRIC =
    kkn.NOOP_OBSERVABLE_COUNTER_METRIC =
    kkn.NOOP_UP_DOWN_COUNTER_METRIC =
    kkn.NOOP_HISTOGRAM_METRIC =
    kkn.NOOP_GAUGE_METRIC =
    kkn.NOOP_COUNTER_METRIC =
    kkn.NOOP_METER =
    kkn.NoopObservableUpDownCounterMetric =
    kkn.NoopObservableGaugeMetric =
    kkn.NoopObservableCounterMetric =
    kkn.NoopObservableMetric =
    kkn.NoopHistogramMetric =
    kkn.NoopGaugeMetric =
    kkn.NoopUpDownCounterMetric =
    kkn.NoopCounterMetric =
    kkn.NoopMetric =
    kkn.NoopMeter =
      void 0;
  class dHr {
    constructor() {}
    createGauge(e, t) {
      return kkn.NOOP_GAUGE_METRIC;
    }
    createHistogram(e, t) {
      return kkn.NOOP_HISTOGRAM_METRIC;
    }
    createCounter(e, t) {
      return kkn.NOOP_COUNTER_METRIC;
    }
    createUpDownCounter(e, t) {
      return kkn.NOOP_UP_DOWN_COUNTER_METRIC;
    }
    createObservableGauge(e, t) {
      return kkn.NOOP_OBSERVABLE_GAUGE_METRIC;
    }
    createObservableCounter(e, t) {
      return kkn.NOOP_OBSERVABLE_COUNTER_METRIC;
    }
    createObservableUpDownCounter(e, t) {
      return kkn.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
    }
    addBatchObservableCallback(e, t) {}
    removeBatchObservableCallback(e) {}
  }
  kkn.NoopMeter = dHr;
  class Jxe {}
  kkn.NoopMetric = Jxe;
  class mHr extends Jxe {
    add(e, t) {}
  }
  kkn.NoopCounterMetric = mHr;
  class _Hr extends Jxe {
    add(e, t) {}
  }
  kkn.NoopUpDownCounterMetric = _Hr;
  class hHr extends Jxe {
    record(e, t) {}
  }
  kkn.NoopGaugeMetric = hHr;
  class LHr extends Jxe {
    record(e, t) {}
  }
  kkn.NoopHistogramMetric = LHr;
  class GVe {
    addCallback(e) {}
    removeCallback(e) {}
  }
  kkn.NoopObservableMetric = GVe;
  class $Hr extends GVe {}
  kkn.NoopObservableCounterMetric = $Hr;
  class gHr extends GVe {}
  kkn.NoopObservableGaugeMetric = gHr;
  class EHr extends GVe {}
  kkn.NoopObservableUpDownCounterMetric = EHr;
  kkn.NOOP_METER = new dHr();
  kkn.NOOP_COUNTER_METRIC = new mHr();
  kkn.NOOP_GAUGE_METRIC = new hHr();
  kkn.NOOP_HISTOGRAM_METRIC = new LHr();
  kkn.NOOP_UP_DOWN_COUNTER_METRIC = new _Hr();
  kkn.NOOP_OBSERVABLE_COUNTER_METRIC = new $Hr();
  kkn.NOOP_OBSERVABLE_GAUGE_METRIC = new gHr();
  kkn.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new EHr();
  function sho() {
    return kkn.NOOP_METER;
  }
  kkn.createNoopMeter = sho;
});