/* ============================================================
   KodNest Premium Build System — Interaction Logic
   Version 1.0
   ============================================================ */

(function () {
    'use strict';

    /* ----------------------------------------------------------
       1. PROOF FOOTER — Checklist Toggles
       ---------------------------------------------------------- */

    function initChecklistItems() {
        const items = document.querySelectorAll('.checklist-item');
        items.forEach(function (item) {
            item.addEventListener('click', function () {
                item.classList.toggle('checklist-item--checked');
                updateStatusBadge();
            });
        });
    }


    /* ----------------------------------------------------------
       2. STATUS BADGE — State Management
       ---------------------------------------------------------- */

    /**
     * Evaluates checklist state and updates the status badge.
     * Not Started → In Progress → Shipped
     */
    function updateStatusBadge() {
        var badge = document.querySelector('[data-status-badge]');
        if (!badge) return;

        var items = document.querySelectorAll('.checklist-item');
        var checked = document.querySelectorAll('.checklist-item--checked');

        if (items.length === 0) return;

        if (checked.length === 0) {
            setBadgeState(badge, 'not-started', 'Not Started');
        } else if (checked.length === items.length) {
            setBadgeState(badge, 'shipped', 'Shipped');
        } else {
            setBadgeState(badge, 'in-progress', 'In Progress');
        }
    }

    function setBadgeState(badge, state, label) {
        badge.className = 'badge';
        if (state === 'not-started') {
            badge.classList.add('badge--default');
        } else if (state === 'in-progress') {
            badge.classList.add('badge--in-progress');
        } else if (state === 'shipped') {
            badge.classList.add('badge--shipped');
        }
        badge.textContent = label;
    }


    /* ----------------------------------------------------------
       3. COPY TO CLIPBOARD — Prompt Box
       ---------------------------------------------------------- */

    function initCopyButtons() {
        var buttons = document.querySelectorAll('[data-copy-target]');
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetId = btn.getAttribute('data-copy-target');
                var target = document.getElementById(targetId);
                if (!target) return;

                var text = target.textContent;
                navigator.clipboard.writeText(text).then(function () {
                    var original = btn.textContent;
                    btn.textContent = 'Copied';
                    btn.disabled = true;
                    setTimeout(function () {
                        btn.textContent = original;
                        btn.disabled = false;
                    }, 1500);
                });
            });
        });
    }


    /* ----------------------------------------------------------
       4. PROGRESS INDICATOR — Step Update
       ---------------------------------------------------------- */

    /**
     * Sets the progress indicator to a given step.
     * @param {number} currentStep — 1-indexed current step
     * @param {number} totalSteps — total number of steps
     */
    window.setProgress = function (currentStep, totalSteps) {
        var steps = document.querySelectorAll('.progress-indicator__step');
        var label = document.querySelector('.progress-indicator__label');

        steps.forEach(function (step, i) {
            step.className = 'progress-indicator__step';
            if (i < currentStep - 1) {
                step.classList.add('progress-indicator__step--completed');
            } else if (i === currentStep - 1) {
                step.classList.add('progress-indicator__step--current');
            }
        });

        if (label) {
            label.textContent = 'Step ' + currentStep + ' / ' + totalSteps;
        }
    };


    /* ----------------------------------------------------------
       5. INITIALIZATION
       ---------------------------------------------------------- */

    function init() {
        initChecklistItems();
        initCopyButtons();
        updateStatusBadge();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
