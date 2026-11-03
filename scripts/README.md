# Local editorial intake

Run from the repository root:

```sh
python3 scripts/intake_group.py '/path/to/Telegram export/messages.html'
```

The default queue is `.patoq/intake/queue.json`, ignored by Git and created with owner-only file permissions. It contains outbound URLs and private message IDs, not public book content. Do not place this queue in `docs/` or `content/`.

A repeated export adds no duplicate normalized URLs. This is URL-level deduplication only; reconcile DOI aliases, preprint versions and publication successors during editorial review. URLs can point to papers, courses, products, social posts or non-scholarly resources. A candidate is not a verified paper.

Weekly manual review:

1. Import an updated export. Choose a bounded set of candidates that matter to a chapter question.
2. Resolve bibliographic identity and publication versions. Record the exact evidence checked, uncertainty and reading coverage in a source note.
3. Draft the chapter change and its paired Persian/English wording. Keep unverified suggestions out of supported findings.
4. Review links, typography, meaning, citations and the actual diff; render and inspect both languages and themes.
5. Publish a dated release only after review. Retain deferred candidates for later work.

No background process, network fetching or weekly schedule is installed by this script. Group-member identities and original conversations are not published.
