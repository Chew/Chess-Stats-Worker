// noinspection HtmlRequiredTitleElement
export const DEFAULT_LAYOUT = `
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{ meta }}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <style>
/* Variables Style */
:root {
    --darkreader-text--bs-body-color: #b9b3aa;
    --darkreader-bg--bs-body-bg: #1c1e1f;
}

.dr.table {
    --darkreader-text--bs-table-color-type: initial;
    --darkreader-bg--bs-table-bg-type: initial;
    --darkreader-text--bs-table-color-state: initial;
    --darkreader-bg--bs-table-bg-state: initial;
    --darkreader-text--bs-table-color: var(--darkreader-text--bs-body-color);
    --darkreader-bg--bs-table-bg: var(--darkreader-bg--bs-body-bg);
    --darkreader-border--bs-table-border-color: var(--darkreader-border--bs-border-color);
    --darkreader-bg--bs-table-accent-bg: rgba(0, 0, 0, 0);
    --darkreader-text--bs-table-striped-color: var(--darkreader-text--bs-body-color);
    --darkreader-bg--bs-table-striped-bg: rgba(0, 0, 0, 0.05);
    --darkreader-text--bs-table-active-color: var(--darkreader-text--bs-body-color);
    --darkreader-bg--bs-table-active-bg: rgba(0, 0, 0, 0.1);
    --darkreader-text--bs-table-hover-color: var(--darkreader-text--bs-body-color);
    --darkreader-bg--bs-table-hover-bg: rgba(0, 0, 0, 0.07);
    border-color: var(--darkreader-border--bs-table-border-color);
}
.dr.table > :not(caption) > * > * {
    color: var(--darkreader-text--bs-table-color-state, var(--darkreader-text--bs-table-color-type, var(--darkreader-text--bs-table-color)));
    background-color: var(--darkreader-bg--bs-table-bg);
    border-bottom-width: var(--darkreader-border--bs-border-width);
    box-shadow: inset 0 0 0 9999px var(--darkreader-bg--bs-table-bg-state, var(--darkreader-bg--bs-table-bg-type, var(--darkreader-bg--bs-table-accent-bg)));
}
.dr.table-group-divider {
    border-top: calc(var(--darkreader-border--bs-border-width) * 2) solid currentcolor;
}
.dr.table-striped > tbody > tr:nth-of-type(2n+1) > * {
    --darkreader-text--bs-table-color-type: var(--darkreader-text--bs-table-striped-color);
    --darkreader-bg--bs-table-bg-type: var(--darkreader-bg--bs-table-striped-bg);
}
.dr.table-active {
    --darkreader-text--bs-table-color-state: var(--darkreader-text--bs-table-active-color);
    --darkreader-bg--bs-table-bg-state: var(--darkreader-bg--bs-table-active-bg);
}
.dr.table-hover > tbody > tr:hover > * {
    --darkreader-text--bs-table-color-state: var(--darkreader-text--bs-table-hover-color);
    --darkreader-bg--bs-table-bg-state: var(--darkreader-bg--bs-table-hover-bg);
}
.dr.table-secondary {
    --darkreader-text--bs-table-color: #e8e6e3;
    --darkreader-bg--bs-table-bg: #282b2c;
    --darkreader-border--bs-table-border-color: #3e4346;
    --darkreader-bg--bs-table-striped-bg: #2e3233;
    --darkreader-text--bs-table-striped-color: #e8e6e3;
    --darkreader-bg--bs-table-active-bg: #35393b;
    --darkreader-text--bs-table-active-color: #e8e6e3;
    --darkreader-bg--bs-table-hover-bg: #313537;
    --darkreader-text--bs-table-hover-color: #e8e6e3;
    color: var(--darkreader-text--bs-table-color);
    border-color: var(--darkreader-border--bs-table-border-color);
}
.dr.table-success {
    --darkreader-text--bs-table-color: #e8e6e3;
    --darkreader-bg--bs-table-bg: #203d33;
    --darkreader-border--bs-table-border-color: #404548;
    --darkreader-bg--bs-table-striped-bg: #2a4139;
    --darkreader-text--bs-table-striped-color: #e8e6e3;
    --darkreader-bg--bs-table-active-bg: #31463f;
    --darkreader-text--bs-table-active-color: #e8e6e3;
    --darkreader-bg--bs-table-hover-bg: #2d443c;
    --darkreader-text--bs-table-hover-color: #e8e6e3;
    color: var(--darkreader-text--bs-table-color);
    border-color: var(--darkreader-border--bs-table-border-color);
}
.dr.table-danger {
    --darkreader-text--bs-table-color: #e8e6e3;
    --darkreader-bg--bs-table-bg: #430c11;
    --darkreader-border--bs-table-border-color: #552d2f;
    --darkreader-bg--bs-table-striped-bg: #44191d;
    --darkreader-text--bs-table-striped-color: #e8e6e3;
    --darkreader-bg--bs-table-active-bg: #462527;
    --darkreader-text--bs-table-active-color: #e8e6e3;
    --darkreader-bg--bs-table-hover-bg: #442023;
    --darkreader-text--bs-table-hover-color: #e8e6e3;
    color: var(--darkreader-text--bs-table-color);
    border-color: var(--darkreader-border--bs-table-border-color);
}
    </style>
</head>
<body>
    <div class="container move-container">
      <div class="p-4 bg-body-tertiary rounded-3">
        {{ yield }}
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
</body>
</html>
`
