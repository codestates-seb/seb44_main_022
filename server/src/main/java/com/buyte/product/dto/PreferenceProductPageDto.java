package com.buyte.product.dto;

import com.buyte.dto.PageInfoDto;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PreferenceProductPageDto {
    List<PreferenceProductDto> preferenceProductList;
    PageInfoDto pageInfo;
}
