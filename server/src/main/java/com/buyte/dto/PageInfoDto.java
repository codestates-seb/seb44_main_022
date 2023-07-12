package com.buyte.dto;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class PageInfoDto {
    private int page;
    private int size;
    private long totalElement;
    private int totalPage;
}
