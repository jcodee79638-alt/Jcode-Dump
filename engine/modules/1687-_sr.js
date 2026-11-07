
var _sr = ne(() => {
  _sr();
  Gt();
  BA();
  ((cZs = nt({
    auto_resize: be(Vi).annotate({
      description:
        "Resize images before sending them to the model when they exceed configured limits (default: true)",
    }),
    max_width: be(qc).annotate({
      description: "Maximum image width before resizing or rejecting the attachment (default: 2000)",
    }),
    max_height: be(qc).annotate({
      description: "Maximum image height before resizing or rejecting the attachment (default: 2000)",
    }),
    max_base64_bytes: be(qc).annotate({
      description: "Maximum base64 payload bytes for an image attachment (default: 5242880)",
    }),
  }).annotate({ identifier: "ImageAttachmentConfig" })),
    (AZs = nt({ image: be(cZs).annotate({ description: "Image attachment configuration" }) }).annotate({
      identifier: "AttachmentConfig",
    })));
});