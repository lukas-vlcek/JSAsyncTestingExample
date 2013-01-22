#!/bin/sh

../../../../../../closure-library-r2180/closure/bin/calcdeps.py \
--dep ./../../../../../../closure-library-r2180 \
--path ./../../../../../main/javascript \
--output_mode deps \
> Dummy_test_deps.js

echo "Generated file: Dummy_test_deps.js"