# Why do all these test files end in .XYZ?

    I'm having trouble getting Jest to run tests from multiple files. Even though the tests are written to be independent, they seem to cause intermittent errors for one another. For example, a test user account which is meant to be deleted at the end of one test persists into the next text, which causes that next test to fail.

    When I run the same set of tests from a single file, however, they all pass.

    I will continue testing with all modelling tests in the same file. I am aware that there **should** be a separate test file for each model.
