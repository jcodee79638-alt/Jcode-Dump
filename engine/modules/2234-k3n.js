
var k3n = Ie(function (j3n) {
  Object.defineProperty(j3n, "__esModule", { value: !0 });
  j3n.SEMRESATTRS_K8S_STATEFULSET_NAME =
    j3n.SEMRESATTRS_K8S_STATEFULSET_UID =
    j3n.SEMRESATTRS_K8S_DEPLOYMENT_NAME =
    j3n.SEMRESATTRS_K8S_DEPLOYMENT_UID =
    j3n.SEMRESATTRS_K8S_REPLICASET_NAME =
    j3n.SEMRESATTRS_K8S_REPLICASET_UID =
    j3n.SEMRESATTRS_K8S_CONTAINER_NAME =
    j3n.SEMRESATTRS_K8S_POD_NAME =
    j3n.SEMRESATTRS_K8S_POD_UID =
    j3n.SEMRESATTRS_K8S_NAMESPACE_NAME =
    j3n.SEMRESATTRS_K8S_NODE_UID =
    j3n.SEMRESATTRS_K8S_NODE_NAME =
    j3n.SEMRESATTRS_K8S_CLUSTER_NAME =
    j3n.SEMRESATTRS_HOST_IMAGE_VERSION =
    j3n.SEMRESATTRS_HOST_IMAGE_ID =
    j3n.SEMRESATTRS_HOST_IMAGE_NAME =
    j3n.SEMRESATTRS_HOST_ARCH =
    j3n.SEMRESATTRS_HOST_TYPE =
    j3n.SEMRESATTRS_HOST_NAME =
    j3n.SEMRESATTRS_HOST_ID =
    j3n.SEMRESATTRS_FAAS_MAX_MEMORY =
    j3n.SEMRESATTRS_FAAS_INSTANCE =
    j3n.SEMRESATTRS_FAAS_VERSION =
    j3n.SEMRESATTRS_FAAS_ID =
    j3n.SEMRESATTRS_FAAS_NAME =
    j3n.SEMRESATTRS_DEVICE_MODEL_NAME =
    j3n.SEMRESATTRS_DEVICE_MODEL_IDENTIFIER =
    j3n.SEMRESATTRS_DEVICE_ID =
    j3n.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT =
    j3n.SEMRESATTRS_CONTAINER_IMAGE_TAG =
    j3n.SEMRESATTRS_CONTAINER_IMAGE_NAME =
    j3n.SEMRESATTRS_CONTAINER_RUNTIME =
    j3n.SEMRESATTRS_CONTAINER_ID =
    j3n.SEMRESATTRS_CONTAINER_NAME =
    j3n.SEMRESATTRS_AWS_LOG_STREAM_ARNS =
    j3n.SEMRESATTRS_AWS_LOG_STREAM_NAMES =
    j3n.SEMRESATTRS_AWS_LOG_GROUP_ARNS =
    j3n.SEMRESATTRS_AWS_LOG_GROUP_NAMES =
    j3n.SEMRESATTRS_AWS_EKS_CLUSTER_ARN =
    j3n.SEMRESATTRS_AWS_ECS_TASK_REVISION =
    j3n.SEMRESATTRS_AWS_ECS_TASK_FAMILY =
    j3n.SEMRESATTRS_AWS_ECS_TASK_ARN =
    j3n.SEMRESATTRS_AWS_ECS_LAUNCHTYPE =
    j3n.SEMRESATTRS_AWS_ECS_CLUSTER_ARN =
    j3n.SEMRESATTRS_AWS_ECS_CONTAINER_ARN =
    j3n.SEMRESATTRS_CLOUD_PLATFORM =
    j3n.SEMRESATTRS_CLOUD_AVAILABILITY_ZONE =
    j3n.SEMRESATTRS_CLOUD_REGION =
    j3n.SEMRESATTRS_CLOUD_ACCOUNT_ID =
    j3n.SEMRESATTRS_CLOUD_PROVIDER =
      void 0;
  j3n.CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE =
    j3n.CLOUDPLATFORMVALUES_AZURE_APP_SERVICE =
    j3n.CLOUDPLATFORMVALUES_AZURE_FUNCTIONS =
    j3n.CLOUDPLATFORMVALUES_AZURE_AKS =
    j3n.CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES =
    j3n.CLOUDPLATFORMVALUES_AZURE_VM =
    j3n.CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK =
    j3n.CLOUDPLATFORMVALUES_AWS_LAMBDA =
    j3n.CLOUDPLATFORMVALUES_AWS_EKS =
    j3n.CLOUDPLATFORMVALUES_AWS_ECS =
    j3n.CLOUDPLATFORMVALUES_AWS_EC2 =
    j3n.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC =
    j3n.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS =
    j3n.CloudProviderValues =
    j3n.CLOUDPROVIDERVALUES_GCP =
    j3n.CLOUDPROVIDERVALUES_AZURE =
    j3n.CLOUDPROVIDERVALUES_AWS =
    j3n.CLOUDPROVIDERVALUES_ALIBABA_CLOUD =
    j3n.SemanticResourceAttributes =
    j3n.SEMRESATTRS_WEBENGINE_DESCRIPTION =
    j3n.SEMRESATTRS_WEBENGINE_VERSION =
    j3n.SEMRESATTRS_WEBENGINE_NAME =
    j3n.SEMRESATTRS_TELEMETRY_AUTO_VERSION =
    j3n.SEMRESATTRS_TELEMETRY_SDK_VERSION =
    j3n.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE =
    j3n.SEMRESATTRS_TELEMETRY_SDK_NAME =
    j3n.SEMRESATTRS_SERVICE_VERSION =
    j3n.SEMRESATTRS_SERVICE_INSTANCE_ID =
    j3n.SEMRESATTRS_SERVICE_NAMESPACE =
    j3n.SEMRESATTRS_SERVICE_NAME =
    j3n.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION =
    j3n.SEMRESATTRS_PROCESS_RUNTIME_VERSION =
    j3n.SEMRESATTRS_PROCESS_RUNTIME_NAME =
    j3n.SEMRESATTRS_PROCESS_OWNER =
    j3n.SEMRESATTRS_PROCESS_COMMAND_ARGS =
    j3n.SEMRESATTRS_PROCESS_COMMAND_LINE =
    j3n.SEMRESATTRS_PROCESS_COMMAND =
    j3n.SEMRESATTRS_PROCESS_EXECUTABLE_PATH =
    j3n.SEMRESATTRS_PROCESS_EXECUTABLE_NAME =
    j3n.SEMRESATTRS_PROCESS_PID =
    j3n.SEMRESATTRS_OS_VERSION =
    j3n.SEMRESATTRS_OS_NAME =
    j3n.SEMRESATTRS_OS_DESCRIPTION =
    j3n.SEMRESATTRS_OS_TYPE =
    j3n.SEMRESATTRS_K8S_CRONJOB_NAME =
    j3n.SEMRESATTRS_K8S_CRONJOB_UID =
    j3n.SEMRESATTRS_K8S_JOB_NAME =
    j3n.SEMRESATTRS_K8S_JOB_UID =
    j3n.SEMRESATTRS_K8S_DAEMONSET_NAME =
    j3n.SEMRESATTRS_K8S_DAEMONSET_UID =
      void 0;
  j3n.TelemetrySdkLanguageValues =
    j3n.TELEMETRYSDKLANGUAGEVALUES_WEBJS =
    j3n.TELEMETRYSDKLANGUAGEVALUES_RUBY =
    j3n.TELEMETRYSDKLANGUAGEVALUES_PYTHON =
    j3n.TELEMETRYSDKLANGUAGEVALUES_PHP =
    j3n.TELEMETRYSDKLANGUAGEVALUES_NODEJS =
    j3n.TELEMETRYSDKLANGUAGEVALUES_JAVA =
    j3n.TELEMETRYSDKLANGUAGEVALUES_GO =
    j3n.TELEMETRYSDKLANGUAGEVALUES_ERLANG =
    j3n.TELEMETRYSDKLANGUAGEVALUES_DOTNET =
    j3n.TELEMETRYSDKLANGUAGEVALUES_CPP =
    j3n.OsTypeValues =
    j3n.OSTYPEVALUES_Z_OS =
    j3n.OSTYPEVALUES_SOLARIS =
    j3n.OSTYPEVALUES_AIX =
    j3n.OSTYPEVALUES_HPUX =
    j3n.OSTYPEVALUES_DRAGONFLYBSD =
    j3n.OSTYPEVALUES_OPENBSD =
    j3n.OSTYPEVALUES_NETBSD =
    j3n.OSTYPEVALUES_FREEBSD =
    j3n.OSTYPEVALUES_DARWIN =
    j3n.OSTYPEVALUES_LINUX =
    j3n.OSTYPEVALUES_WINDOWS =
    j3n.HostArchValues =
    j3n.HOSTARCHVALUES_X86 =
    j3n.HOSTARCHVALUES_PPC64 =
    j3n.HOSTARCHVALUES_PPC32 =
    j3n.HOSTARCHVALUES_IA64 =
    j3n.HOSTARCHVALUES_ARM64 =
    j3n.HOSTARCHVALUES_ARM32 =
    j3n.HOSTARCHVALUES_AMD64 =
    j3n.AwsEcsLaunchtypeValues =
    j3n.AWSECSLAUNCHTYPEVALUES_FARGATE =
    j3n.AWSECSLAUNCHTYPEVALUES_EC2 =
    j3n.CloudPlatformValues =
    j3n.CLOUDPLATFORMVALUES_GCP_APP_ENGINE =
    j3n.CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS =
    j3n.CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE =
    j3n.CLOUDPLATFORMVALUES_GCP_CLOUD_RUN =
      void 0;
  var t8 = scr(),
    HBn = "cloud.provider",
    cBn = "cloud.account.id",
    ABn = "cloud.region",
    uBn = "cloud.availability_zone",
    lBn = "cloud.platform",
    fBn = "aws.ecs.container.arn",
    pBn = "aws.ecs.cluster.arn",
    dBn = "aws.ecs.launchtype",
    mBn = "aws.ecs.task.arn",
    _Bn = "aws.ecs.task.family",
    hBn = "aws.ecs.task.revision",
    LBn = "aws.eks.cluster.arn",
    $Bn = "aws.log.group.names",
    gBn = "aws.log.group.arns",
    EBn = "aws.log.stream.names",
    IBn = "aws.log.stream.arns",
    DBn = "container.name",
    yBn = "container.id",
    MBn = "container.runtime",
    xBn = "container.image.name",
    SBn = "container.image.tag",
    TBn = "deployment.environment",
    vBn = "device.id",
    bBn = "device.model.identifier",
    jBn = "device.model.name",
    PBn = "faas.name",
    CBn = "faas.id",
    wBn = "faas.version",
    kBn = "faas.instance",
    OBn = "faas.max_memory",
    UBn = "host.id",
    NBn = "host.name",
    FBn = "host.type",
    BBn = "host.arch",
    RBn = "host.image.name",
    WBn = "host.image.id",
    VBn = "host.image.version",
    qBn = "k8s.cluster.name",
    GBn = "k8s.node.name",
    XBn = "k8s.node.uid",
    JBn = "k8s.namespace.name",
    KBn = "k8s.pod.uid",
    zBn = "k8s.pod.name",
    QBn = "k8s.container.name",
    YBn = "k8s.replicaset.uid",
    ZBn = "k8s.replicaset.name",
    eRn = "k8s.deployment.uid",
    tRn = "k8s.deployment.name",
    rRn = "k8s.statefulset.uid",
    nRn = "k8s.statefulset.name",
    iRn = "k8s.daemonset.uid",
    sRn = "k8s.daemonset.name",
    oRn = "k8s.job.uid",
    aRn = "k8s.job.name",
    HRn = "k8s.cronjob.uid",
    cRn = "k8s.cronjob.name",
    ARn = "os.type",
    uRn = "os.description",
    lRn = "os.name",
    fRn = "os.version",
    pRn = "process.pid",
    dRn = "process.executable.name",
    mRn = "process.executable.path",
    _Rn = "process.command",
    hRn = "process.command_line",
    LRn = "process.command_args",
    $Rn = "process.owner",
    gRn = "process.runtime.name",
    ERn = "process.runtime.version",
    IRn = "process.runtime.description",
    DRn = "service.name",
    yRn = "service.namespace",
    MRn = "service.instance.id",
    xRn = "service.version",
    SRn = "telemetry.sdk.name",
    TRn = "telemetry.sdk.language",
    vRn = "telemetry.sdk.version",
    bRn = "telemetry.auto.version",
    jRn = "webengine.name",
    PRn = "webengine.version",
    CRn = "webengine.description";
  j3n.SEMRESATTRS_CLOUD_PROVIDER = HBn;
  j3n.SEMRESATTRS_CLOUD_ACCOUNT_ID = cBn;
  j3n.SEMRESATTRS_CLOUD_REGION = ABn;
  j3n.SEMRESATTRS_CLOUD_AVAILABILITY_ZONE = uBn;
  j3n.SEMRESATTRS_CLOUD_PLATFORM = lBn;
  j3n.SEMRESATTRS_AWS_ECS_CONTAINER_ARN = fBn;
  j3n.SEMRESATTRS_AWS_ECS_CLUSTER_ARN = pBn;
  j3n.SEMRESATTRS_AWS_ECS_LAUNCHTYPE = dBn;
  j3n.SEMRESATTRS_AWS_ECS_TASK_ARN = mBn;
  j3n.SEMRESATTRS_AWS_ECS_TASK_FAMILY = _Bn;
  j3n.SEMRESATTRS_AWS_ECS_TASK_REVISION = hBn;
  j3n.SEMRESATTRS_AWS_EKS_CLUSTER_ARN = LBn;
  j3n.SEMRESATTRS_AWS_LOG_GROUP_NAMES = $Bn;
  j3n.SEMRESATTRS_AWS_LOG_GROUP_ARNS = gBn;
  j3n.SEMRESATTRS_AWS_LOG_STREAM_NAMES = EBn;
  j3n.SEMRESATTRS_AWS_LOG_STREAM_ARNS = IBn;
  j3n.SEMRESATTRS_CONTAINER_NAME = DBn;
  j3n.SEMRESATTRS_CONTAINER_ID = yBn;
  j3n.SEMRESATTRS_CONTAINER_RUNTIME = MBn;
  j3n.SEMRESATTRS_CONTAINER_IMAGE_NAME = xBn;
  j3n.SEMRESATTRS_CONTAINER_IMAGE_TAG = SBn;
  j3n.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT = TBn;
  j3n.SEMRESATTRS_DEVICE_ID = vBn;
  j3n.SEMRESATTRS_DEVICE_MODEL_IDENTIFIER = bBn;
  j3n.SEMRESATTRS_DEVICE_MODEL_NAME = jBn;
  j3n.SEMRESATTRS_FAAS_NAME = PBn;
  j3n.SEMRESATTRS_FAAS_ID = CBn;
  j3n.SEMRESATTRS_FAAS_VERSION = wBn;
  j3n.SEMRESATTRS_FAAS_INSTANCE = kBn;
  j3n.SEMRESATTRS_FAAS_MAX_MEMORY = OBn;
  j3n.SEMRESATTRS_HOST_ID = UBn;
  j3n.SEMRESATTRS_HOST_NAME = NBn;
  j3n.SEMRESATTRS_HOST_TYPE = FBn;
  j3n.SEMRESATTRS_HOST_ARCH = BBn;
  j3n.SEMRESATTRS_HOST_IMAGE_NAME = RBn;
  j3n.SEMRESATTRS_HOST_IMAGE_ID = WBn;
  j3n.SEMRESATTRS_HOST_IMAGE_VERSION = VBn;
  j3n.SEMRESATTRS_K8S_CLUSTER_NAME = qBn;
  j3n.SEMRESATTRS_K8S_NODE_NAME = GBn;
  j3n.SEMRESATTRS_K8S_NODE_UID = XBn;
  j3n.SEMRESATTRS_K8S_NAMESPACE_NAME = JBn;
  j3n.SEMRESATTRS_K8S_POD_UID = KBn;
  j3n.SEMRESATTRS_K8S_POD_NAME = zBn;
  j3n.SEMRESATTRS_K8S_CONTAINER_NAME = QBn;
  j3n.SEMRESATTRS_K8S_REPLICASET_UID = YBn;
  j3n.SEMRESATTRS_K8S_REPLICASET_NAME = ZBn;
  j3n.SEMRESATTRS_K8S_DEPLOYMENT_UID = eRn;
  j3n.SEMRESATTRS_K8S_DEPLOYMENT_NAME = tRn;
  j3n.SEMRESATTRS_K8S_STATEFULSET_UID = rRn;
  j3n.SEMRESATTRS_K8S_STATEFULSET_NAME = nRn;
  j3n.SEMRESATTRS_K8S_DAEMONSET_UID = iRn;
  j3n.SEMRESATTRS_K8S_DAEMONSET_NAME = sRn;
  j3n.SEMRESATTRS_K8S_JOB_UID = oRn;
  j3n.SEMRESATTRS_K8S_JOB_NAME = aRn;
  j3n.SEMRESATTRS_K8S_CRONJOB_UID = HRn;
  j3n.SEMRESATTRS_K8S_CRONJOB_NAME = cRn;
  j3n.SEMRESATTRS_OS_TYPE = ARn;
  j3n.SEMRESATTRS_OS_DESCRIPTION = uRn;
  j3n.SEMRESATTRS_OS_NAME = lRn;
  j3n.SEMRESATTRS_OS_VERSION = fRn;
  j3n.SEMRESATTRS_PROCESS_PID = pRn;
  j3n.SEMRESATTRS_PROCESS_EXECUTABLE_NAME = dRn;
  j3n.SEMRESATTRS_PROCESS_EXECUTABLE_PATH = mRn;
  j3n.SEMRESATTRS_PROCESS_COMMAND = _Rn;
  j3n.SEMRESATTRS_PROCESS_COMMAND_LINE = hRn;
  j3n.SEMRESATTRS_PROCESS_COMMAND_ARGS = LRn;
  j3n.SEMRESATTRS_PROCESS_OWNER = $Rn;
  j3n.SEMRESATTRS_PROCESS_RUNTIME_NAME = gRn;
  j3n.SEMRESATTRS_PROCESS_RUNTIME_VERSION = ERn;
  j3n.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION = IRn;
  j3n.SEMRESATTRS_SERVICE_NAME = DRn;
  j3n.SEMRESATTRS_SERVICE_NAMESPACE = yRn;
  j3n.SEMRESATTRS_SERVICE_INSTANCE_ID = MRn;
  j3n.SEMRESATTRS_SERVICE_VERSION = xRn;
  j3n.SEMRESATTRS_TELEMETRY_SDK_NAME = SRn;
  j3n.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = TRn;
  j3n.SEMRESATTRS_TELEMETRY_SDK_VERSION = vRn;
  j3n.SEMRESATTRS_TELEMETRY_AUTO_VERSION = bRn;
  j3n.SEMRESATTRS_WEBENGINE_NAME = jRn;
  j3n.SEMRESATTRS_WEBENGINE_VERSION = PRn;
  j3n.SEMRESATTRS_WEBENGINE_DESCRIPTION = CRn;
  j3n.SemanticResourceAttributes = t8.createConstMap([
    HBn,
    cBn,
    ABn,
    uBn,
    lBn,
    fBn,
    pBn,
    dBn,
    mBn,
    _Bn,
    hBn,
    LBn,
    $Bn,
    gBn,
    EBn,
    IBn,
    DBn,
    yBn,
    MBn,
    xBn,
    SBn,
    TBn,
    vBn,
    bBn,
    jBn,
    PBn,
    CBn,
    wBn,
    kBn,
    OBn,
    UBn,
    NBn,
    FBn,
    BBn,
    RBn,
    WBn,
    VBn,
    qBn,
    GBn,
    XBn,
    JBn,
    KBn,
    zBn,
    QBn,
    YBn,
    ZBn,
    eRn,
    tRn,
    rRn,
    nRn,
    iRn,
    sRn,
    oRn,
    aRn,
    HRn,
    cRn,
    ARn,
    uRn,
    lRn,
    fRn,
    pRn,
    dRn,
    mRn,
    _Rn,
    hRn,
    LRn,
    $Rn,
    gRn,
    ERn,
    IRn,
    DRn,
    yRn,
    MRn,
    xRn,
    SRn,
    TRn,
    vRn,
    bRn,
    jRn,
    PRn,
    CRn,
  ]);
  var wRn = "alibaba_cloud",
    kRn = "aws",
    ORn = "azure",
    URn = "gcp";
  j3n.CLOUDPROVIDERVALUES_ALIBABA_CLOUD = wRn;
  j3n.CLOUDPROVIDERVALUES_AWS = kRn;
  j3n.CLOUDPROVIDERVALUES_AZURE = ORn;
  j3n.CLOUDPROVIDERVALUES_GCP = URn;
  j3n.CloudProviderValues = t8.createConstMap([wRn, kRn, ORn, URn]);
  var NRn = "alibaba_cloud_ecs",
    FRn = "alibaba_cloud_fc",
    BRn = "aws_ec2",
    RRn = "aws_ecs",
    WRn = "aws_eks",
    VRn = "aws_lambda",
    qRn = "aws_elastic_beanstalk",
    GRn = "azure_vm",
    XRn = "azure_container_instances",
    JRn = "azure_aks",
    KRn = "azure_functions",
    zRn = "azure_app_service",
    QRn = "gcp_compute_engine",
    YRn = "gcp_cloud_run",
    ZRn = "gcp_kubernetes_engine",
    e3n = "gcp_cloud_functions",
    t3n = "gcp_app_engine";
  j3n.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = NRn;
  j3n.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = FRn;
  j3n.CLOUDPLATFORMVALUES_AWS_EC2 = BRn;
  j3n.CLOUDPLATFORMVALUES_AWS_ECS = RRn;
  j3n.CLOUDPLATFORMVALUES_AWS_EKS = WRn;
  j3n.CLOUDPLATFORMVALUES_AWS_LAMBDA = VRn;
  j3n.CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = qRn;
  j3n.CLOUDPLATFORMVALUES_AZURE_VM = GRn;
  j3n.CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = XRn;
  j3n.CLOUDPLATFORMVALUES_AZURE_AKS = JRn;
  j3n.CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = KRn;
  j3n.CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = zRn;
  j3n.CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = QRn;
  j3n.CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = YRn;
  j3n.CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = ZRn;
  j3n.CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = e3n;
  j3n.CLOUDPLATFORMVALUES_GCP_APP_ENGINE = t3n;
  j3n.CloudPlatformValues = t8.createConstMap([
    NRn,
    FRn,
    BRn,
    RRn,
    WRn,
    VRn,
    qRn,
    GRn,
    XRn,
    JRn,
    KRn,
    zRn,
    QRn,
    YRn,
    ZRn,
    e3n,
    t3n,
  ]);
  var r3n = "ec2",
    n3n = "fargate";
  j3n.AWSECSLAUNCHTYPEVALUES_EC2 = r3n;
  j3n.AWSECSLAUNCHTYPEVALUES_FARGATE = n3n;
  j3n.AwsEcsLaunchtypeValues = t8.createConstMap([r3n, n3n]);
  var i3n = "amd64",
    s3n = "arm32",
    o3n = "arm64",
    a3n = "ia64",
    H3n = "ppc32",
    c3n = "ppc64",
    A3n = "x86";
  j3n.HOSTARCHVALUES_AMD64 = i3n;
  j3n.HOSTARCHVALUES_ARM32 = s3n;
  j3n.HOSTARCHVALUES_ARM64 = o3n;
  j3n.HOSTARCHVALUES_IA64 = a3n;
  j3n.HOSTARCHVALUES_PPC32 = H3n;
  j3n.HOSTARCHVALUES_PPC64 = c3n;
  j3n.HOSTARCHVALUES_X86 = A3n;
  j3n.HostArchValues = t8.createConstMap([i3n, s3n, o3n, a3n, H3n, c3n, A3n]);
  var u3n = "windows",
    l3n = "linux",
    f3n = "darwin",
    p3n = "freebsd",
    d3n = "netbsd",
    m3n = "openbsd",
    _3n = "dragonflybsd",
    h3n = "hpux",
    L3n = "aix",
    $3n = "solaris",
    g3n = "z_os";
  j3n.OSTYPEVALUES_WINDOWS = u3n;
  j3n.OSTYPEVALUES_LINUX = l3n;
  j3n.OSTYPEVALUES_DARWIN = f3n;
  j3n.OSTYPEVALUES_FREEBSD = p3n;
  j3n.OSTYPEVALUES_NETBSD = d3n;
  j3n.OSTYPEVALUES_OPENBSD = m3n;
  j3n.OSTYPEVALUES_DRAGONFLYBSD = _3n;
  j3n.OSTYPEVALUES_HPUX = h3n;
  j3n.OSTYPEVALUES_AIX = L3n;
  j3n.OSTYPEVALUES_SOLARIS = $3n;
  j3n.OSTYPEVALUES_Z_OS = g3n;
  j3n.OsTypeValues = t8.createConstMap([u3n, l3n, f3n, p3n, d3n, m3n, _3n, h3n, L3n, $3n, g3n]);
  var E3n = "cpp",
    I3n = "dotnet",
    D3n = "erlang",
    y3n = "go",
    M3n = "java",
    x3n = "nodejs",
    S3n = "php",
    T3n = "python",
    v3n = "ruby",
    b3n = "webjs";
  j3n.TELEMETRYSDKLANGUAGEVALUES_CPP = E3n;
  j3n.TELEMETRYSDKLANGUAGEVALUES_DOTNET = I3n;
  j3n.TELEMETRYSDKLANGUAGEVALUES_ERLANG = D3n;
  j3n.TELEMETRYSDKLANGUAGEVALUES_GO = y3n;
  j3n.TELEMETRYSDKLANGUAGEVALUES_JAVA = M3n;
  j3n.TELEMETRYSDKLANGUAGEVALUES_NODEJS = x3n;
  j3n.TELEMETRYSDKLANGUAGEVALUES_PHP = S3n;
  j3n.TELEMETRYSDKLANGUAGEVALUES_PYTHON = T3n;
  j3n.TELEMETRYSDKLANGUAGEVALUES_RUBY = v3n;
  j3n.TELEMETRYSDKLANGUAGEVALUES_WEBJS = b3n;
  j3n.TelemetrySdkLanguageValues = t8.createConstMap([E3n, I3n, D3n, y3n, M3n, x3n, S3n, T3n, v3n, b3n]);
});