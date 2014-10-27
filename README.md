# Few scripts to help you port from quinit to jasmine

# Setup
```sh
nvm use 0.10 # I only know it works on node 0.10
npm install -g grunt
npm install
grunt watch
```

# Convert matchers
```node es5/qunit-jasmine-matchers.js <QUNIT_TEST_PATH>```

ok()
equal()
strictEqual()
deepEqual()

-->

expect().toEqual()
