# WorldCycle Author and Figure-Fill Revision

## Objective

Revise the existing WorldCycle research website in two focused ways:

1. Replace every anonymous-submission label with the real author and affiliation metadata supplied in the updated paper archive.
2. Make all five paper figures visually fill their cards by removing excess white page margins from the generated PNG assets.

No other visual system, content structure, interaction, metric, or video behavior will change.

## Author Metadata

The updated manuscript provides the following author order and contribution markers:

1. Bohai Gu - HKUST, equal contribution
2. Yueyang Yuan - Wuhan University, equal contribution
3. Taiyi Wu - AI Technology Center, Tencent Video, Tencent
4. Dazhao Du - HKUST
5. Jian Liu - HKUST
6. Xiaoyi Pang - HKUST
7. Jie Zhang - HKUST
8. Xiaocheng Lu - HKUST
9. Haobin Zhong - AI Technology Center, Tencent Video, Tencent
10. Xiaotong Zhao - AI Technology Center, Tencent Video, Tencent
11. Alan Zhao - AI Technology Center, Tencent Video, Tencent
12. Song Guo - HKUST, corresponding author

Affiliations will be displayed exactly as supplied:

- The Hong Kong University of Science and Technology
- Wuhan University
- AI Technology Center, Tencent Video, Tencent

## Website Changes

### Hero authorship block

Replace the current anonymous-submission line with a wrapping author list below the paper title and summary. Each author will have the correct numeric affiliation marker. Bohai Gu and Yueyang Yuan will share an equal-contribution marker, and Song Guo will carry a corresponding-author marker. A compact legend and the three affiliations will appear beneath the names.

The block will remain legible at desktop widths and collapse into centered wrapped rows on phones without altering the orbit graphic or hero hierarchy.

### Citation

Replace the anonymous BibTeX author value with all twelve authors in manuscript order. Remove the anonymous-submission note. No publication venue, year, arXiv identifier, email, or URL will be invented because the supplied source does not provide them.

### Footer and metadata

Replace the anonymous footer label with `WorldCycle research project`. The existing browser title and description already contain no anonymous wording and need no change.

## Figure Cropping

The source PDFs are unchanged between the anonymous and author-identified archives. The existing 180-DPI PNG renders will remain the source for website delivery.

For each of the five PNGs, determine the bounding box of pixels that differ from the white page background, expand that box by a small safety margin, and write the cropped image back under the same stable filename. The crop must retain every label, arrow, border, and caption embedded inside the scientific figure.

The website figure cards will then remove their internal image padding so the cropped figure reaches the card edges. The separate HTML figure caption remains unchanged and visually separated below the image.

This content-aware crop is preferred to CSS `object-fit: cover` because it removes actual page margins while preserving the complete scientific figure at every responsive width.

## Verification

- Confirm all twelve author names, their order, affiliation markers, and contribution markers against the updated TeX source.
- Confirm that `Anonymous`, `anonymous`, and `Anonymous Submission` no longer appear in the website HTML.
- Confirm the BibTeX block contains all twelve authors and no invented metadata.
- Record original and cropped dimensions for all five images.
- Visually inspect every cropped PNG at high detail and verify that no text, border, arrow, or plot axis is clipped.
- Confirm each cropped image remains a valid PNG and all five existing website paths still resolve.
- Re-run JavaScript syntax, HTML structure, local-reference, and local HTTP loading checks.
- Preserve all nine existing videos and their synchronized comparison behavior unchanged.

## Non-Goals

- No changes to the paper claims, metrics, abstract, method description, benchmark description, or videos.
- No new publication venue, year, author email, project link, code link, or paper URL.
- No CSS zoom crop, generated content, or modification of scientific figure content.
- No redesign outside the authorship block and figure presentation.
